import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getCurrentProfile,
  getProfileByID,
  deleteAccount,
  getProfile
} from '../../actions/profileActions';
import { getInstructorLessons } from '../../actions/lessonActions';
import MetaTags from 'react-meta-tags';

import Loader from '../../components/common/Loader';
import ProfileColumnL from './ProfileColumnL';
import ProfileUser from './ProfileUser';
import ProfileCommentList from './ProfileCommentList';
import EventList from '../events/EventList';
import VenueList from '../venues/VenueList';
import ProfileLessons from './ProfileLessons';

class Profile extends Component {
  componentDidMount() {
    const { getProfile, getProfileByID, getCurrentProfile, match } = this.props;

    if (match.params.username) {
      getProfile(match.params.username);
    } else if (match.params.id) {
      getProfileByID(match.params.id);
    } else {
      getCurrentProfile();
    }
  }



  removeTags = html => {
    const regex = /(<([^>]+)>)/gi;
    return html.replace(regex, '');
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { events, loadingEvent } = this.props.event;
    const { venues, loadingVenue } = this.props.venue;

    let profileContent;

    if (profile === null || loading) {
      profileContent = <Loader />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        profileContent = (
          <div className="columns is-multiline">
            <MetaTags>
              <title>
                {profile.user.name} |{' '}
                {this.removeTags(profile.bio).substring(0, 150)}
              </title>
              <meta name="description" content={this.removeTags(profile.bio)} />
              <meta property="og:title" content={profile.name} />
              <meta property="og:image" content={profile.photo} />
            </MetaTags>
            <ProfileColumnL />
            <div className="column is-paddingless is-two-thirds-tablet is-three-quarters-desktop">
              <div className="columns is-multiline is-full">
                {profile.user.isAdmin === true ||
                profile.user.isInstructor === true ||
                profile.user.isOwner === true ? (
                  <div className="column is-full">
                    <ProfileLessons
                      instructor={profile.user}
                    />
                    <EventList
                      profile={profile}
                      loading={loading}
                      user={user}
                      events={events}
                      loadingEvent={loadingEvent}
                    />
                    <VenueList
                      profile={profile}
                      loading={loading}
                      user={user}
                      venues={venues}
                      loadingVenue={loadingVenue}
                    />
                  </div>
                ) : null}
                <ProfileCommentList />
              </div>
            </div>
          </div>
        );
      } else {
        profileContent = (
          <div className="columns">
            <div className="column is-one-third-tablet is-one-quarter-desktop">
              <ProfileUser />
            </div>
            <div className="column is-two-thirds-tablet is-three-quarters-desktop">
              <div className="card">
                <div className="card-content">
                  <div className="content margin-top-btm">
                    Welcome to Dancer Spots. Please add your information to
                    share with other dancers.
                  </div>
                  <div className="media">
                    <Link to="/create-my-profile" className="button is-success">
                      <span className="icon is-small">
                        <i className="fas fa-plus-square" aria-hidden="true" />
                      </span>
                      Create Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="profile">
        <div className="section">
          <div className="container">{profileContent}</div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  instructorLessons: state.lesson.instructorLessons,
  event: state.event,
  venue: state.venue
});

export default connect(
  mapStateToProps,
  {
    getProfile,
    getCurrentProfile,
    getProfileByID,
    getInstructorLessons,
    deleteAccount
  }
)(Profile);
