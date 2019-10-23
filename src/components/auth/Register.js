import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { dancerspotsAPI } from '../../config/baseUrl';
import TextFieldGroup from '../common/TextFieldGroup';
import CheckboxFieldGroup from '../common/CheckboxFieldGroup';
import Header from '../common/Header';
import PhotoUpload from '../common/PhotoUpload';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      confpassword: '',
      photo: '',
      imagePreview: '',
      selectedFile: null,
      isOwner: false,
      isInstructor: false,
      disableSubmitButton: false,
      errors: {}
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auth.isAuthenticated !== this.props.auth.isAuthenticated) {
      if (this.props.auth.isAuthenticated) {
        this.props.history.push('/myprofile');
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    this.setState({ disableSubmitButton: false });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClickOwnerChange = e => {
    this.setState({ isOwner: !this.state.isOwner });
  };

  onClickInstructorChange = e => {
    this.setState({ isInstructor: !this.state.isInstructor });
  };

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

  onSubmit = e => {
    e.preventDefault();
    this.setState({ disableSubmitButton: true });
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      photo: this.state.photo,
      confpassword: this.state.confpassword,
      isOwner: this.state.isOwner,
      isInstructor: this.state.isInstructor
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors, disableSubmitButton } = this.state;

    return (
      <div>
        <Header
          title='Sign up to Dancespot'
          subtitle='A place for dancers to find their next dance spot at home or abroad'
          color='is-primary is-bold'
        />

        <div className='columns is-mobile is-centered padding-top-btm'>
          <div className='column is-4-widescreen is-half-tablet is-11-mobile'>
            <form onSubmit={this.onSubmit} className='box'>
              <TextFieldGroup
                label='name'
                labelText='Full Name'
                placeholder='Ivan Garcia'
                name='name'
                value={this.state.name}
                onChange={this.onChange}
                error={errors.name}
              />
              <TextFieldGroup
                label='email'
                labelText='Email'
                placeholder='ivangarcia@gmail.com'
                name='email'
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
              />
              <TextFieldGroup
                label='password'
                labelText='Password'
                placeholder='Secure Password'
                name='password'
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
                type='password'
              />
              <TextFieldGroup
                label='confpassword'
                labelText='Confirm Password'
                placeholder='Confirm Password'
                name='confpassword'
                value={this.state.confpassword}
                onChange={this.onChange}
                error={errors.confpassword}
                type='password'
              />

              <PhotoUpload
                photo={this.state.photo}
                drop={this.onChangeHandler}
                error={errors.photo}
                label='photo'
                labelText='Photo'
              />
              <div className='field'>
                <p>Are you an instructor or own an establishment?</p>
              </div>
              <CheckboxFieldGroup
                name='isinstructor'
                value={this.state.isInstructor}
                onChange={this.onClickInstructorChange}
                label='Instructor'
              />
              <CheckboxFieldGroup
                name='isinstructor'
                value={this.state.isOwner}
                onChange={this.onClickOwnerChange}
                label='Owner'
              />
              <div className='field'>
                <div className='control'>
                  <button
                    className='button is-primary'
                    type='submit'
                    disabled={disableSubmitButton}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    registerUser
  }
)(withRouter(Register));
