import React, { useState, useEffect, useCallback } from 'react';
import { Formik, Field, Form } from 'formik';
import { Link, withRouter } from 'react-router-dom';
import { getAllVenues, filterVenuesByName } from '../../actions/venueActions';
import options from '../../data/danceOptions';
import { connect } from 'react-redux';
import { addLesson } from '../../actions/lessonActions';
import { upperCaseFirst } from '../../helpers/uppercase';
import TimePickerField from '../common/TimePickerField';
import Header from '../common/Header';
import SelectFieldGroup from '../common/SelectFieldGroup';
import PhotoUpload from '../common/PhotoUpload';
import FilteredVenues from '../events/FilteredVenues';
import moment from 'moment';
import axios from 'axios';

const AddLesson = ({
  venue,
  addLesson,
  history,
  fieldErrors,
  filterVenuesByName,
  getAllVenues
}) => {
  const [foundErrors, setFoundErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [photo, setPhoto] = useState('');
  const [venueData, setVenueData] = useState({
    venue: '',
    venueFound: false
  });

  const fileUpload = useCallback(async () => {
    let url = '/api/uploads';
    const data = new FormData();
    data.append('photo', selectedFile);

    const res = await axios.post(url, data);
    setPhoto(res.data.path);
  }, [selectedFile]);

  useEffect(() => {
    setFoundErrors({ ...fieldErrors });
  }, [fieldErrors]);

  useEffect(() => {
    getAllVenues();
    fileUpload();
  }, [fileUpload, getAllVenues]);

  useEffect(() => {}, [venue.filteredByName]);

  const renderError = type =>
    foundErrors[type] && (
      <span className="icon is-small is-right">
        <p className="help is-danger">
          {' '}
          <i className="fas fa-exclamation-triangle has-text-warning" />
          {upperCaseFirst(foundErrors[type])}
        </p>
      </span>
    );

  const searchVenues = searchInput => {
    const { venues } = venue;
    filterVenuesByName(venues, searchInput.toLowerCase());
  };

  const venueList = () => {
    const { filteredByName } = venue;

    if (filteredByName) {
      let matches = filteredByName.map(venue => (
        <FilteredVenues
          venue={venue}
          key={venue._id}
          onVenueClick={() => fillVenueInput(venue)}
        />
      ));

      if (filteredByName.length === 0) {
        matches = [];
      }

      if (matches.length > 0 && !venueData.venueFound) {
        return <div className="dropdown-container">{matches}</div>;
      } else if (!matches.length) {
        return (
          <div className="dropdown-container">
            <div className="filtered-venues">
              <Link to="/venue/add-venue">
                <p className="filtered-venues__title">No venues found.</p>
                <button className="button is-small is-primary">
                  Add Venue
                </button>
              </Link>
            </div>
          </div>
        );
      }
    }
  };

  const fillVenueInput = venue => {
    setVenueData({
      venue: venue.name,
      venueFound: true
    });
  };

  return (
    <div>
      <Header
        title="Add a Lesson"
        color="is-primary is-bold has-text-centered"
      />
      <div className="columns is-centered is-mobile padding-top-btm">
        <div className="column is-10-mobile is-10-tablet is-5-desktop">
          <Formik
            initialValues={{
              title: '',
              description: '',
              venue: '',
              photo: '',
              starttime: moment(),
              endtime: moment(),
              lessondate: '',
              dance: '',
              price: ''
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              values.photo = photo;
              values.venue = venueData.venue;
              addLesson(values, history);
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              setFieldValue,
              handleBlur,
              handleSubmit,
              isSubmitting
              /* and other goodies */
            }) => (
              <Form onSubmit={handleSubmit} className="form">
                <div className="field">
                  <label htmlFor="title" className="label">
                    Title
                  </label>
                  <Field
                    type="text"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    className="input"
                    placeholder="Bachata Lesson"
                  />
                  {renderError('title')}
                </div>
                <div className="field" style={{ position: 'relative' }}>
                  <label htmlFor="venue" className="label">
                    Venue
                  </label>
                  <Field
                    type="text"
                    name="venue"
                    onChange={e => {
                      const venue = e.target.value;
                      setFieldValue('venue', venue);
                      searchVenues(venue);
                    }}
                    onKeyUp={e =>
                      (e.which === 8 || e.which === 32) &&
                      setVenueData({
                        venue: '',
                        venueFound: false
                      })
                    }
                    onBlur={handleBlur}
                    value={venueData.venue || values.venue}
                    className="input"
                    placeholder="Search Venues"
                  />
                  {renderError('venue')}
                  {values.venue && venueList()}
                </div>
                <div className="field">
                  <PhotoUpload
                    name="photo"
                    photo={photo}
                    drop={event => {
                      setSelectedFile(event[0]);
                      fileUpload();
                    }}
                    error={errors.photo}
                    label="photo"
                    labelText="Photo of Event"
                  />
                  {renderError('photo')}
                </div>
                <div className="field is-grouped">
                  <div className="control">
                    <SelectFieldGroup
                      onChange={e => {
                        const dance = e;
                        setFieldValue('dance', dance.value);
                      }}
                      error={foundErrors.dance}
                      label="dance"
                      labelText="What are you teaching in this lesson?"
                      options={options}
                      isMulti={false}
                    />
                  </div>
                  <div className="control">
                    <label htmlFor="price" className="label">
                      Price
                    </label>
                    <Field
                      type="text"
                      name="price"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price}
                      className="input"
                      placeholder="1200¥"
                    />
                    {renderError('price')}
                  </div>
                </div>
                <div className="field is-grouped">
                  <div className="control">
                    <label htmlFor="lessondate" className="label">
                      Lesson Date
                    </label>
                    <Field
                      type="date"
                      name="lessondate"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lessondate}
                      className="input"
                    />
                    {renderError('lessondate')}
                  </div>
                  <TimePickerField
                    value={values.starttime}
                    onChange={e => {
                      const starttime = e;
                      handleChange(e);
                      setFieldValue('starttime', starttime);
                    }}
                    name="starttime"
                    label="starttime"
                    labelText="Start time"
                    info="At what time does the event start and end?"
                    format="h:mm a"
                    error={fieldErrors.starttime}
                  />
                  <TimePickerField
                    value={values.endtime}
                    onChange={e => {
                      const endtime = e;
                      handleChange(e);
                      setFieldValue('endtime', endtime);
                    }}
                    name="endtime"
                    label="endtime"
                    labelText="End time"
                  />
                </div>
                <div className="field" />
                <div className="field">
                  <label htmlFor="description" className="label">
                    Description
                  </label>
                  <Field
                    type="textarea"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    className="textarea"
                    placeholder="Describe your lesson..."
                  />
                  {renderError('description')}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button is-primary"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  fieldErrors: state.errors,
  venue: state.venue
});

export default connect(
  mapStateToProps,
  { addLesson, getAllVenues, filterVenuesByName }
)(withRouter(AddLesson));
