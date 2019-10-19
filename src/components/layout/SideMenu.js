import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
import { Image, Transformation } from 'cloudinary-react';
import isEmpty from '../../validation/is-empty';
import { ReactComponent as Lesson } from '../../svg/salsa.svg';

class SideMenu extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser(this.props.history);
  }

  renderUserImage = () => {
    const { user } = this.props.auth;

    return !isEmpty(user) ? (
      <Image
        cloudName={process.env.REACT_APP_CLOUDINARY_API_CLOUD_NAME}
        publicId={user.photo}
        className="side-menu__photo"
      >
        <Transformation
          width="200"
          height="200"
          crop="fill"
          gravity="faces"
          quality="auto:best"
          fetch_format="auto"
          responsive
        />
      </Image>
    ) : (
      <Lesson
        style={{
          width: '100px',
          height: '100px'
        }}
      />
    );
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { sideMenuClickHandler } = this.props;

    let sideMenuClasses = 'side-menu';

    if (this.props.show) {
      sideMenuClasses = 'side-menu open';
    }

    const guestLinks = (
      <React.Fragment>
        <li>
          <Link
            to="/register"
            className="side-menu__link"
            onClick={sideMenuClickHandler}
          >
            <i className="fas fa-user-plus" />
            Sign up
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="side-menu__link"
            onClick={sideMenuClickHandler}
          >
            <i className="fas fa-sign-in-alt" />
            Log in
          </Link>
        </li>
      </React.Fragment>
    );

    return (
      <div className={sideMenuClasses}>
        <header className="side-menu__header">
          {this.renderUserImage()}
          <Link
            to="/myprofile"
            onClick={sideMenuClickHandler}
            className="side-menu__heading"
          >
            {isAuthenticated ? 'My Profile' : ' Dancer Spots'}
          </Link>

          {(user.isOwner || user.isInstructor) && (
            <div className="flex margin-top-btm">
              <Link
                to="/event/add-event"
                className="button is-small is-dark"
                onClick={sideMenuClickHandler}
              >
                Add Event
              </Link>

              <Link
                to="/venue/add-venue"
                className="button is-small is-success"
                onClick={sideMenuClickHandler}
              >
                Add Venue
              </Link>
              <Link
                to="/lesson/add"
                className="button is-small is-info has-text-dark"
                onClick={sideMenuClickHandler}
              >
                Add Lesson
              </Link>
            </div>
          )}
        </header>
        <ul>
          {!isAuthenticated && guestLinks}

          <li>
            <Link
              to="/profiles/all"
              className="side-menu__link"
              onClick={sideMenuClickHandler}
            >
              <i className="far fa-user-circle" />
              Profiles
            </Link>
          </li>
          <li>
            <Link
              to="/venues/all"
              className="side-menu__link"
              onClick={sideMenuClickHandler}
            >
              <i className="fas fa-map-marked-alt" />
              Venues
            </Link>
          </li>
          <li>
            <Link
              to="/events/all"
              className="side-menu__link"
              onClick={sideMenuClickHandler}
            >
              <i className="fas fa-calendar-alt" />
              Events
            </Link>
          </li>
          <li>
            <Link
              to="/lessons/all"
              className="side-menu__link"
              onClick={sideMenuClickHandler}
            >
              <Lesson
                style={{
                  width: '18px',
                  height: '18px',
                  display: 'inline',
                  marginRight: '5px'
                }}
              />
              Find Lessons
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link
                onClick={this.onLogoutClick.bind(this)}
                to="/register"
                className="side-menu__link"
              >
                <i className="fas fa-sign-out-alt" />
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

SideMenu.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(withRouter(SideMenu));
