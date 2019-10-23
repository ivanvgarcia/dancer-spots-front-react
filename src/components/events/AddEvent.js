import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEvent } from '../../actions/eventActions';
import { getAllVenues, filterVenuesByName } from '../../actions/venueActions';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TimePickerField from '../common/TimePickerField';
import moment from 'moment';
import { dancerspotsAPI } from '../../config/baseUrl';
import PhotoUpload from '../common/PhotoUpload';
import TextEditor from '../common/TextEditor';
import FilteredVenues from './FilteredVenues';

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      photo: '',
      address: '',
      country: '',
      region: '',
      city: '',
      dateofevent: '',
      starttime: moment(),
      endtime: moment(),
      description: '',
      venue: '',
      venueFound: '',
      selectedFile: null,
      errors: {},
      disableSubmitButton: false
    };

    this.onChange = this.onChange.bind(this);
    this.onStartTimeChange = this.onStartTimeChange.bind(this);
    this.onEndTimeChange = this.onEndTimeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onEditorChange = value => {
    this.setState({ description: value });
  };

  componentDidMount() {
    this.props.getAllVenues();
  }

  onSearchChange = e => {
    const { venues } = this.props.venue;

    this.setState({ [e.target.name]: e.target.value }, () => {
      this.props.filterVenuesByName(venues, this.state.venue.toLowerCase());
    });

    if (!this.state.venue.length) {
      this.setState({ venueFound: false });
    }
  };

  venueList = () => {
    const { filteredByName } = this.props.venue;

    if (filteredByName) {
      let matches = filteredByName.map(venue => (
        <FilteredVenues
          venue={venue}
          key={venue._id}
          onVenueClick={() => this.fillVenueInput(venue, filteredByName)}
        />
      ));

      if (this.state.venue.length === 0) {
        matches = [];
      }

      if (matches.length > 0 && !this.state.venueFound) {
        return <div className='dropdown-container'>{matches}</div>;
      } else if (!matches.length && this.state.venue.length > 0) {
        return (
          <div className='dropdown-container'>
            <div className='filtered-venues'>
              <Link to='/venue/add-venue'>
                <p className='filtered-venues__title'>No venues found.</p>
                <button className='button is-small is-primary'>
                  Add Venue
                </button>
              </Link>
            </div>
          </div>
        );
      }
    }
  };

  fillVenueInput = venue => {
    this.setState({
      venue: venue.name,
      venueFound: true
    });
  };

  onStartTimeChange(starttime) {
    this.setState({ starttime });
  }

  onEndTimeChange(endtime) {
    this.setState({ endtime });
  }

  fileUpload = () => {
    let url = '/uploads';
    const data = new FormData();
    data.append('photo', this.state.selectedFile);

    dancerspotsAPI.post(url, data).then(res => {
      this.setState({
        photo: res.data.path
      });
    });
  };

  onChangeHandler = event => {
    this.setState(
      {
        selectedFile: event[0],
        loaded: 0
      },
      () => {
        this.fileUpload();
      }
    );
  };

  onSubmit(e) {
    e.preventDefault();
    this.setState({ disableSubmitButton: true });

    const eventData = {
      name: this.state.name,
      photo: this.state.photo,
      dateofevent: this.state.dateofevent,
      starttime: this.state.starttime,
      endtime: this.state.endtime,
      description: this.state.description,
      venue: this.state.venue
    };

    this.props.addEvent(eventData, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors, disableSubmitButton: false });
    }
  }

  render() {
    const { errors, disableSubmitButton } = this.state;
    // const { country, region } = this.state;

    return (
      <div className='add-event'>
        <div className='container'>
          <div className='section columns content-is-centered'>
            <div className='column is-half'>
              <div className='margin-top-btm'>
                <Link
                  to='/myprofile'
                  className='button is-small is-primary is-outlined'
                >
                  Go To Profile
                </Link>
              </div>
              <h1 className='title is-2 has-text-weight-light has-text-centered'>
                Add Event
              </h1>
              <p className='subtitle has-text-centered'>
                Add any upcoming dance event
              </p>
              <small className='tag is-primary'>* = required fields</small>
              <form onSubmit={this.onSubmit} className='margin-top-btm'>
                <TextFieldGroup
                  name='name'
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                  label='name'
                  labelText='Name of Event'
                />
                <PhotoUpload
                  photo={this.state.photo}
                  drop={this.onChangeHandler}
                  error={errors.photo}
                  label='photo'
                  labelText='Photo of Event'
                />
                <TextFieldGroup
                  name='dateofevent'
                  value={this.state.dateofevent}
                  onChange={this.onChange}
                  error={errors.dateofevent}
                  label='dateofevent'
                  labelText='Event Date'
                  type='date'
                />
                <div className='field is-grouped'>
                  <TimePickerField
                    value={this.state.starttime}
                    onChange={this.onStartTimeChange}
                    name='starttime'
                    error={errors.starttime}
                    label='starttime'
                    labelText='Start time'
                    info='At what time does the event start and end?'
                    format='h:mm a'
                  />
                  <TimePickerField
                    value={this.state.endtime}
                    onChange={this.onEndTimeChange}
                    name='endtime'
                    error={errors.endtime}
                    label='endtime'
                    labelText='End time'
                  />
                </div>
                <div className='venue-input'>
                  <TextFieldGroup
                    name='venue'
                    value={this.state.venue}
                    onChange={this.onSearchChange}
                    error={errors.venue || errors.novenuefound}
                    label='venue'
                    labelText='Venue'
                    info='Where does the event take place?'
                    placeholder='Search Venues'
                    autocomplete={'false'}
                  />
                  {this.venueList()}
                </div>
                <TextEditor
                  value={this.state.description}
                  onChange={this.onEditorChange}
                  error={errors.description}
                  label='description'
                  labelText='Description'
                  info='Write a short description about the event.'
                />
                <button
                  type='submit'
                  onSubmit={this.onSubmit}
                  className='button is-primary is-outlined'
                  disabled={disableSubmitButton}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEvent.propTypes = {
  addEvent: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  venue: state.venue
});

export default connect(
  mapStateToProps,
  { addEvent, getAllVenues, filterVenuesByName }
)(withRouter(AddEvent));
