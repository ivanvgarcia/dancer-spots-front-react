import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEvent, getCurrentEvent } from "../../actions/eventActions";
import { getAllVenues, filterVenuesByName } from "../../actions/venueActions";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TimePickerField from "../common/TimePickerField";
import PhotoUpload from "../common/PhotoUpload";
import moment from "moment";
import FilteredVenues from "./FilteredVenues";
import TextEditor from "../common/TextEditor";
import axios from "axios";

class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      photo: "",
      dateofevent: "",
      starttime: moment(),
      endtime: moment(),
      description: "",
      venue: "",
      venueFound: true,
      selectedFile: null,
      errors: {},
      disableSubmitButton: false
    };

    this.onChange = this.onChange.bind(this);
    this.onStartTimeChange = this.onStartTimeChange.bind(this);
    this.onEndTimeChange = this.onEndTimeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getAllVenues();
    this.props.getCurrentEvent(this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({
        errors: this.props.errors,
        disableSubmitButton: false
      });
    }

    if (this.props.event.event) {
      const { event } = this.props.event;

      if (prevProps.event !== this.props.event) {
        this.setState({
          name: event.name,
          photo: event.photo,
          dateofevent: moment(event.dateofevent).format("YYYY-MM-DD"),
          starttime: moment(event.starttime),
          endtime: moment(event.endtime),
          description: event.description,
          venue: event.venue.name
        });
      }
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onEditorChange = value => {
    this.setState({ description: value });
  };

  onStartTimeChange(starttime) {
    this.setState({ starttime });
  }

  onEndTimeChange(endtime) {
    this.setState({ endtime });
  }

  fileUpload = () => {
    let url = "/api/uploads";
    const data = new FormData();
    data.append("photo", this.state.selectedFile);

    axios.post(url, data).then(res => {
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
        return <div className="dropdown-container">{matches}</div>;
      } else if (!matches.length && !this.state.venueFound) {
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

  fillVenueInput = venue => {
    this.setState({
      venue: venue.name,
      venueFound: true
    });
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

  render() {
    const { errors, disableSubmitButton } = this.state;

    return (
      <div className="add-event">
        <div className="container">
          <div className="section columns content-is-centered">
            <div className="column is-half">
              <div className="margin-top-btm">
                <Link
                  to="/myprofile"
                  className="button is-small is-primary is-outlined"
                >
                  Go To Profile
                </Link>
              </div>
              <h1 className="title is-2 has-text-weight-light has-text-centered">
                Edit Event
              </h1>
              <small className="tag is-primary">* = required fields</small>
              <form onSubmit={this.onSubmit} className="margin-top-btm">
                <TextFieldGroup
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                  label="name"
                  labelText="Name"
                  disabled={true}
                />
                <PhotoUpload
                  photo={this.state.photo}
                  drop={this.onChangeHandler}
                  error={errors.photo}
                  label="photo"
                  labelText="Photo of Event"
                />
                <TextFieldGroup
                  name="dateofevent"
                  value={this.state.dateofevent}
                  onChange={this.onChange}
                  error={errors.dateofevent}
                  label="dateofevent"
                  labelText="Event Date"
                  type="date"
                />
                <div className="field is-grouped">
                  <TimePickerField
                    value={this.state.starttime}
                    onChange={this.onStartTimeChange}
                    name="starttime"
                    error={errors.starttime}
                    label="starttime"
                    labelText="Start time"
                    info="At what time does the event start?"
                  />
                  <TimePickerField
                    value={this.state.endtime}
                    onChange={this.onEndTimeChange}
                    name="endtime"
                    error={errors.endtime}
                    label="endtime"
                    labelText="End time"
                    info="At what time does the event end?"
                  />
                </div>
                <div className="venue-input">
                  <TextFieldGroup
                    name="venue"
                    value={this.state.venue}
                    onChange={this.onSearchChange}
                    error={errors.venue || errors.novenuefound}
                    label="venue"
                    labelText="Venue"
                    info="Where does the event take place?"
                    placeholder="Search Venues"
                    autocomplete={"false"}
                  />
                  {this.state.venue && this.venueList()}
                </div>
                <TextEditor
                  value={this.state.description}
                  onChange={this.onEditorChange}
                  error={errors.description}
                  label="description"
                  labelText="Description"
                  info="Edit the event's description."
                />
                <button
                  type="submit"
                  onSubmit={this.onSubmit}
                  className="button is-primary is-outlined"
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

EditEvent.propTypes = {
  errors: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  addEvent: PropTypes.func.isRequired,
  getCurrentEvent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  event: state.event,
  venue: state.venue
});

export default connect(
  mapStateToProps,
  { addEvent, getCurrentEvent, getAllVenues, filterVenuesByName }
)(withRouter(EditEvent));
