import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addVenue, getCurrentVenue } from '../../actions/venueActions';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextEditor from '../common/TextEditor';
import PhotoUpload from '../common/PhotoUpload';
import PricePicker from '../common/PricePicker';
import isEmpty from '../../validation/is-empty';
import Loader from '../common/Loader';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import axios from 'axios';

class EditVenue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      photo: '',
      address: '',
      city: '',
      country: '',
      region: '',
      price: '',
      rating: 0,
      description: '',
      venue: '',
      disableSubmitButton: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onEditorChange = value => {
    this.setState({ description: value });
  };

  selectCountry(val) {
    this.setState({ country: val });
  }

  selectRegion(val) {
    this.setState({ region: val });
  }

  onStartTimeChange(starttime) {
    this.setState({ starttime });
  }

  onEndTimeChange(endtime) {
    this.setState({ endtime });
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
    if (nextValue === 1) {
      this.setState({ price: '$' });
    } else if (nextValue === 2) {
      this.setState({ price: '$$' });
    } else if (nextValue === 3) {
      this.setState({ price: '$$$' });
    } else if (nextValue === 4) {
      this.setState({ price: '$$$$' });
    }
  }

  fileUpload = () => {
    let url = '/api/uploads';
    const data = new FormData();
    data.append('photo', this.state.selectedFile);

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

  onSubmit(e) {
    e.preventDefault();
    this.setState({ disableSubmitButton: true });
    const venueData = {
      name: this.state.name,
      address: `${this.state.address.trim()}, ${this.state.city.trim()}, ${this.state.region.trim()}, ${this.state.country.trim()}`,
      price: this.state.price,
      photo: this.state.photo,
      description: this.state.description
    };

    this.props.addVenue(venueData, this.props.history);
  }

  componentDidMount() {
    this.props.getCurrentVenue(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors, disableSubmitButton: false });
    }

    if (nextProps.venue.venue) {
      const venue = nextProps.venue.venue;
      const address = venue.address.split(', ');
      
      if (venue.address && typeof venue.address === 'string') {
        venue.address = !isEmpty(venue.address) ? address[0].trim() : '';
        venue.city = !isEmpty(venue.city) ? address[1].trim() : '';
        venue.region = !isEmpty(venue.region) ? address[2].trim() : '';
        venue.country = !isEmpty(venue.country) ? address[3].trim() : '';
      }


      function fillInput(data) {
        const venueFields = ['name', 'image', 'description'];

        venueFields.forEach(field => {
          data[field] = !isEmpty(data[field]) ? data[field] : '';
        });
      }

      fillInput(venue);

      if (venue.price === '$') {
        this.setState({ rating: 1 });
      }
      if (venue.price === '$$') {
        this.setState({ rating: 2 });
      }
      if (venue.price === '$$$') {
        this.setState({ rating: 3 });
      }
      if (venue.price === '$$$$') {
        this.setState({ rating: 4 });
      }
      // Set components field states
      venue.venue = this.setState({
        name: venue.name.trim(),
        photo: venue.photo,
        address: address[0],
        city: address[1],
        region: address[2],
        country: address[3],
        description: venue.description,
        price: venue.price
      });
    }
  }

  render() {
    const { errors, disableSubmitButton, country, region } = this.state;
    const { venue } = this.props.venue;

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
                Edit {venue ? venue.name : <Loader />}
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
                />
                <PhotoUpload
                  photo={this.state.photo}
                  drop={this.onChangeHandler}
                  error={errors.photo}
                  label="photo"
                  labelText="Photo of Venue"
                />
                <TextFieldGroup
                  name="address"
                  value={this.state.address}
                  onChange={this.onChange}
                  error={errors.address}
                  label="address"
                  labelText="Address"
                />
                <div className="field">
                  <div className="control">
                    <label
                      htmlFor="location"
                      className="label has-text-weight-light"
                    >
                      Country
                    </label>
                    <span className="select">
                      <CountryDropdown
                        value={country}
                        onChange={val => this.selectCountry(val)}
                        whitelist={['US', 'JP']}
                        name="country"
                      />
                    </span>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label
                      htmlFor="location"
                      className="label has-text-weight-light"
                    >
                      Region
                    </label>
                    <span className="select">
                      <RegionDropdown
                        country={country}
                        value={region}
                        onChange={val => this.selectRegion(val)}
                        classes="select"
                        disableWhenEmpty={true}
                        name="region"
                      />
                    </span>
                  </div>
                </div>
                <TextFieldGroup
                  name="city"
                  value={this.state.city}
                  onChange={this.onChange}
                  error={errors.city}
                  label="city"
                  labelText="City"
                />
                <PricePicker
                  name="price"
                  value={this.state.rating}
                  onStarClick={this.onStarClick}
                  error={errors.price || errors.novenuefound}
                  label="price"
                  labelText="Price"
                  info="1 icon = not very expensive : 4 icons = very expensive"
                />
                <TextEditor
                  value={this.state.description}
                  onChange={this.onEditorChange}
                  error={errors.description}
                  label="description"
                  labelText="Description"
                  info="Write a short description about the venue."
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

EditVenue.propTypes = {
  addVenue: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getCurrentVenue: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  venue: state.venue
});

export default connect(
  mapStateToProps,
  { addVenue, getCurrentVenue }
)(withRouter(EditVenue));
