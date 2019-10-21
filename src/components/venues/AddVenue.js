import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addVenue } from '../../actions/venueActions';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextEditor from '../common/TextEditor';
import PricePicker from '../common/PricePicker';
import PhotoUpload from '../common/PhotoUpload';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { dancerspotsAPI } from 'axios';

class AddVenue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      photo: '',
      ImagePreview: '',
      address: '',
      country: '',
      region: '',
      city: '',
      price: '',
      rating: 2,
      description: '',
      venue: '',
      selectedFile: null,
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

    let fullAddress = `${this.state.address.trim()}, ${this.state.city.trim()}, ${this.state.region.trim()}, ${this.state.country.trim()}`;

    const venueData = {
      name: this.state.name,
      photo: this.state.photo,
      address: fullAddress,
      price: this.state.price,
      description: this.state.description
    };

    this.props.addVenue(venueData, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors, disableSubmitButton: false });
    }
  }

  render() {
    const { errors, disableSubmitButton } = this.state;
    const { country, region } = this.state;

    return (
      <div className='add-venue'>
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
                Add Studio or Venue
              </h1>
              <p className='subtitle has-text-centered'>
                Add a venue or studio you own or that you have visited before.
              </p>
              <small className='tag is-primary'>* = required fields</small>
              <form onSubmit={this.onSubmit} className='margin-top-btm'>
                <TextFieldGroup
                  name='name'
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                  label='name'
                  labelText='Name'
                />
                <PhotoUpload
                  photo={this.state.photo}
                  drop={this.onChangeHandler}
                  imagePreview={this.state.imagePreview}
                  label='photo'
                  labelText='Photo of Venue'
                />
                <TextFieldGroup
                  name='address'
                  value={this.state.address}
                  onChange={this.onChange}
                  error={errors.address}
                  label='address'
                  labelText='Address'
                />
                <div className='field'>
                  <div className='control'>
                    <label
                      htmlFor='location'
                      className='label has-text-weight-light'
                    >
                      Country
                    </label>
                    <span className='select'>
                      <CountryDropdown
                        value={country}
                        onChange={val => this.selectCountry(val)}
                        whitelist={['US', 'JP']}
                        name='country'
                      />
                    </span>
                  </div>
                </div>
                <div className='field'>
                  <div className='control'>
                    <label
                      htmlFor='location'
                      className='label has-text-weight-light'
                    >
                      Region
                    </label>
                    <span className='select'>
                      <RegionDropdown
                        country={country}
                        value={region}
                        onChange={val => this.selectRegion(val)}
                        classes='select'
                        disableWhenEmpty={true}
                        name='region'
                      />
                    </span>
                  </div>
                </div>
                <TextFieldGroup
                  name='city'
                  value={this.state.city}
                  onChange={this.onChange}
                  error={errors.city}
                  label='city'
                  labelText='City'
                />
                <PricePicker
                  name='price'
                  value={this.state.rating}
                  onStarClick={this.onStarClick}
                  error={errors.price || errors.novenuefound}
                  label='price'
                  labelText='Price'
                  info='1 icon = not very expensive : 4 icons = very expensive'
                />
                <TextEditor
                  value={this.state.description}
                  onChange={this.onEditorChange}
                  error={errors.description}
                  label='description'
                  labelText='Description'
                  info='Write a short description about the venue.'
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

AddVenue.propTypes = {
  addVenue: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addVenue }
)(withRouter(AddVenue));
