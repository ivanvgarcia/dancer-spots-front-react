import React, { Component } from 'react';
import { ReactComponent as Salsa } from '../notfound/salsa.svg';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
import { Image, Transformation } from 'cloudinary-react';
import ToggleButton from './ToggleButton';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser(this.props.history);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { sideMenuClickHandler } = this.props;

    const authLinks = (
      <div className="navbar-end is-dark">
        <Link to="/myprofile" className="navbar-item">
          <Image
            cloudName={process.env.REACT_APP_CLOUDINARY_API_CLOUD_NAME}
            publicId={user.photo}
            style={{ borderRadius: '50%', marginRight: '5px' }}
          >
            <Transformation
              width="200"
              height="200"
              crop="fill"
              gravity="faces"
              background="#363636"
              quality="auto:best"
              fetch_format="auto"
              responsive
            />
          </Image>
          {user.name}
        </Link>

        <div className="navbar-item">
          <Link
            onClick={this.onLogoutClick.bind(this)}
            to="/register"
            className="button is-primary"
          >
            Logout
          </Link>
        </div>
      </div>
    );

    const guestLinks = (
      <div className="navbar-end">
        <div className="buttons">
          <Link to="/register" className="button is-primary">
            <strong>Sign up</strong>
          </Link>
          <Link to="/login" className="button is-light">
            Log in
          </Link>
        </div>
      </div>
    );

    return (
      <header>
        <nav
          className="navbar is-light is-fixed-top"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <Link className="navbar-item logo" to="/">
              <Salsa
                style={{ width: '40px', height: '40px', marginRight: '5px' }}
              />
              Dancer Spots
            </Link>
            <ToggleButton click={sideMenuClickHandler} />
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <Link to="/profiles/all" className="navbar-item">
                Profiles
              </Link>
              <Link to="/venues/all" className="navbar-item">
                Venues
              </Link>
              <Link to="/events/all" className="navbar-item">
                Events
              </Link>
              <Link to="/lessons/all" className="navbar-item">
                Find Lessons
              </Link>
              {isAuthenticated &&
                (user.isAdmin || user.isOwner || user.isInstructor) && (
                  <div className="navbar-item has-dropdown is-hoverable">
                    <div className="navbar-link">More</div>
                    <div className="navbar-dropdown">
                      <Link to="/event/add-event" className="navbar-item">
                        Add Event
                      </Link>
                      <hr className="navbar-divider" />
                      <Link to="/venue/add-venue" className="navbar-item">
                        Add Venue
                      </Link>
                      <hr className="navbar-divider" />
                      <Link to="/lesson/add" className="navbar-item">
                        Add Lesson
                      </Link>
                    </div>
                  </div>
                )}
            </div>

            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </nav>
      </header>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(withRouter(Navbar));
