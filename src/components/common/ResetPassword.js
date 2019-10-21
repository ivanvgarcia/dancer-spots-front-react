import React, { Component, Fragment } from 'react';
import TextFieldGroup from './TextFieldGroup';
import Header from './Header';
import Loader from '../common/Loader';
import { dancerspotsAPI } from 'axios';
import { withRouter } from 'react-router-dom';
import { Image, Transformation } from 'cloudinary-react';
import { connect } from 'react-redux';
import { resetPassword } from '../../actions/authActions';

class ForgotPassword extends Component {
  state = {
    name: '',
    email: '',
    photo: '',
    password: '',
    confirmPassword: '',
    update: false,
    isLoading: true,
    errors: {}
  };

  async componentDidMount() {
    try {
      const response = await dancerspotsAPI.get(
        'https://www.dancerspots.com/users/reset',
        {
          params: {
            resetPasswordToken: this.props.match.params.token
          }
        }
      );
      const { name, email, photo } = response.data;
      if (response.data.email) {
        this.setState({
          name: name,
          email: email,
          photo: photo,
          update: false,
          isLoading: false,
          error: false
        });
      } else {
        this.setState({
          update: false,
          isLoading: false,
          error: [...this.state.error, response.data.message]
        });
      }
    } catch (err) {
      this.setState({
        update: false,
        isLoading: false,
        error: { message: 'your reset password token is invalid.' }
      });
    }
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevProp.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    const userData = {
      email: this.state.email,
      password: this.state.password,
      confirmpassword: this.state.confirmPassword
    };

    evt.preventDefault();
    this.props.resetPassword(userData, this.props.history);
  };

  renderForm = () => {
    const {
      name,
      photo,
      password,
      confirmPassword,
      errors,
      isLoading
    } = this.state;

    if (isLoading) {
      return (
        <Fragment>
          <h4 className='title is-3 has-text-centered is-primary'>
            Loading Info
          </h4>
          <Loader />
        </Fragment>
      );
    } else {
      return (
        <div className='column is-centered'>
          <div className='column is-full content-is-centered'>
            <Image
              cloudName={process.env.REACT_APP_CLOUDINARY_API_CLOUD_NAME}
              publicId={photo}
            >
              <Transformation
                width='150'
                height='150'
                crop='fill'
                dpr='auto'
                radius='max'
                gravity='faces'
                quality='auto:best'
                fetch_format='auto'
                responsive
                background='#f8f8f8'
              />
            </Image>
            <h5 className='title is-5 has-text-primary'>
              {name.split(' ')[0]} please reset your password
            </h5>
          </div>

          <form onSubmit={this.handleSubmit}>
            <TextFieldGroup
              type='password'
              label='password'
              labelText='Password'
              placeholder='enter a secure password'
              name='password'
              value={password}
              onChange={this.handleInputChange}
              error={errors.password}
            />
            <TextFieldGroup
              type='password'
              label='confirmPassword'
              labelText='Confirm Password'
              placeholder='confirm password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={this.handleInputChange}
              error={errors.confirmpassword}
            />
            <button type='submit' className='button is-primary'>
              Reset Password
            </button>
          </form>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <Header
          title='Reset Password'
          subtitle='Fill in the following form to get a new password sent to your registered email.'
          color='is-primary is-bold'
        />
        <div
          className='columns is-mobile is-centered'
          style={{ margin: '3em 0' }}
        >
          <div className='column is-4-widescreen is-half-tablet'>
            {this.renderForm()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { resetPassword }
)(withRouter(ForgotPassword));
