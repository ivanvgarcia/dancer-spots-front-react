import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { editCurrentUser, getCurrentUser } from '../../actions/authActions';

import { dancerspotsAPI } from 'axios';

import PhotoUploader from '../common/PhotoUpload';
import TextFieldGroup from '../common/TextFieldGroup';

class EditUserData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      photo: '',
      errors: {},
      disabledSubmitButton: false,
      selectedFile: null
    };
  }

  componentDidMount() {
    const { user } = this.props.auth;
    if (user) {
      this.setState({
        name: user.name,
        email: user.email,
        photo: user.photo
      });
    } else {
      this.props.getCurrentUser();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { user } = this.props.auth;

    if (prevProps !== this.props) {
      this.setState({
        name: user.name,
        email: user.email,
        photo: user.photo
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
    this.setState({ disabledSubmitButton: true });

    const editUser = {
      name: this.state.name,
      email: this.state.email
    };

    if (editUser.name.length === 0 || editUser.email.length === 0) {
      this.setState({ disabledSubmitButton: false });
    } else {
      this.props.auth.user.photo === this.state.photo
        ? (editUser.photo = null)
        : (editUser.photo = this.state.photo);

      this.props.editCurrentUser(
        editUser,
        this.props.match.params.id,
        this.props.history
      );
    }
  };

  render() {
    const { disabledSubmitButton, errors } = this.state;
    const { profile } = this.props.profile;
    const { user } = this.props.auth;

    return (
      <form onSubmit={this.onSubmit} className='columns is-centered'>
        <div className='column is-6 is-7-widescreen'>
          <div className='section'>
            <h4 className='title is-5'>Edit Info</h4>
            <TextFieldGroup
              name='name'
              label='Full Name'
              value={this.state.name}
              onChange={this.onChange}
              labelText={'Full Name'}
              error={errors.name}
            />
            <TextFieldGroup
              name='email'
              label='Email'
              value={this.state.email}
              onChange={this.onChange}
              labelText={'Email'}
              error={errors.email}
            />
            <PhotoUploader
              photo={this.state.photo}
              drop={this.onChangeHandler}
              profile={profile}
              user={user}
              error={errors.photo}
            />
          </div>
          <div className='column has-text-centered'>
            <button
              className='button is-primary'
              type='submit'
              disabled={disabledSubmitButton}
            >
              Update Info
            </button>
          </div>
        </div>
      </form>
    );
  }
}

EditUserData.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  editCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentUser, editCurrentUser }
)(withRouter(EditUserData));
