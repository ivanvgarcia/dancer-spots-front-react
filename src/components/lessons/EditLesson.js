import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { Formik, Field, Form } from 'formik';
import { dancerspotsAPI } from '../../config/baseUrl';
import { withRouter } from 'react-router-dom';
import options from '../../data/danceOptions';
import { connect } from 'react-redux';
import { editLesson, getLesson } from '../../actions/lessonActions';
import { upperCaseFirst } from '../../helpers/uppercase';
import TimePickerField from '../common/TimePickerField';
import PhotoUpload from '../common/PhotoUpload';
import Loader from '../common/Loader';
import Header from '../common/Header';
import SelectFieldGroup from '../common/SelectFieldGroup';
import moment from 'moment';

const EditLesson = ({
  getLesson,
  editLesson,
  history,
  fieldErrors,
  lesson,
  ...props
}) => {
  const [foundErrors, setFoundErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    setFoundErrors({ ...fieldErrors });
  }, [fieldErrors]);

  useEffect(() => {
    getLesson(props.match.params.id);
  }, [getLesson, props.match.params.id]);

  const fileUpload = useCallback(async () => {
    let url = '/uploads';
    const data = new FormData();
    data.append('photo', selectedFile);

    const res = await dancerspotsAPI.post(url, data);
    setPhoto(res.data.path);
  }, [selectedFile]);

  useEffect(() => {
    selectedFile && fileUpload();
  }, [fileUpload, selectedFile]);

  const renderError = type =>
    foundErrors[type] && (
      <span className='icon is-small is-right'>
        <p className='help is-danger'>
          {' '}
          <i className='fas fa-exclamation-triangle has-text-warning' />
          {upperCaseFirst(foundErrors[type])}
        </p>
      </span>
    );

  return (
    <div>
      {!lesson ? (
        <Fragment>
          <Loader />
        </Fragment>
      ) : (
        <Fragment>
          <Header
            title={`Edit ${lesson.title}`}
            color='is-primary is-bold has-text-centered'
          />
          <div className='columns is-centered padding-top-btm'>
            <div className='column is-5'>
              <Formik
                enableReinitialize
                initialValues={{
                  title: lesson.title,
                  description: lesson.description,
                  venue: lesson.venue.name,
                  photo: lesson.photo,
                  starttime: moment(lesson.starttime),
                  endtime: moment(lesson.endtime),
                  lessondate: moment(lesson.lessondate).format('YYYY-MM-DD'),
                  dance: {
                    value: lesson.dance,
                    label: upperCaseFirst(lesson.dance)
                  },
                  price: lesson.price
                }}
                onSubmit={(values, { setSubmitting }) => {
                  values.photo = photo || values.photo;
                  values.dance = values.dance.value;
                  editLesson(values, props.match.params.id, history);
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
                  <Form onSubmit={handleSubmit} className='form'>
                    <div className='field'>
                      <label htmlFor='title' className='label'>
                        Title
                      </label>
                      <Field
                        type='text'
                        name='title'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                        className='input'
                      />
                      {renderError('title')}
                    </div>
                    <div className='field'>
                      <label htmlFor='venue' className='label'>
                        Venue
                      </label>
                      <Field
                        type='text'
                        name='venue'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.venue}
                        className='input'
                      />
                      {renderError('venue')}
                    </div>
                    <div className='field'>
                      <PhotoUpload
                        name='photo'
                        photo={photo || values.photo}
                        drop={event => {
                          setSelectedFile(event[0]);
                          fileUpload();
                        }}
                        error={errors.photo}
                        label='photo'
                        labelText='Photo of Event'
                      />
                      {renderError('photo')}
                    </div>
                    <div className='field is-grouped'>
                      <div className='control'>
                        <SelectFieldGroup
                          onChange={e => {
                            const dance = e;
                            handleChange(e);
                            setFieldValue('dance', dance.value);
                          }}
                          value={values.dance}
                          error={foundErrors.dance}
                          label='dance'
                          labelText='What are you teaching in this lesson?'
                          options={options}
                          isMulti={false}
                        />
                      </div>
                      <div className='control'>
                        <label htmlFor='price' className='label'>
                          Price
                        </label>
                        <Field
                          type='text'
                          name='price'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.price}
                          className='input'
                        />
                        {renderError('price')}
                      </div>
                    </div>
                    <div className='field is-grouped'>
                      <div className='control'>
                        <label htmlFor='lessondate' className='label'>
                          Lesson Date
                        </label>
                        <Field
                          type='date'
                          name='lessondate'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lessondate}
                          className='input'
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
                        name='starttime'
                        label='starttime'
                        labelText='Start time'
                        info='At what time does the event start and end?'
                        format='h:mm a'
                        error={fieldErrors.starttime}
                      />
                      <TimePickerField
                        value={values.endtime}
                        onChange={e => {
                          const endtime = e;
                          handleChange(e);
                          setFieldValue('endtime', endtime);
                        }}
                        name='endtime'
                        label='endtime'
                        labelText='End time'
                      />
                    </div>
                    <div className='field' />
                    <div className='field'>
                      <label htmlFor='description' className='label'>
                        Description
                      </label>
                      <Field
                        type='textarea'
                        name='description'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        className='textarea'
                      />
                      {renderError('description')}
                    </div>

                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='button is-primary'
                    >
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  fieldErrors: state.errors,
  lesson: state.lesson.lesson
});

export default connect(
  mapStateToProps,
  { getLesson, editLesson }
)(withRouter(EditLesson));
