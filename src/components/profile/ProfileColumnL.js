import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileDanceExperience from "./ProfileDanceExperience";
import ProfileBio from "./ProfileBio";
import ProfileUser from "../profile/ProfileUser";

class ProfileImage extends Component {
  render() {
    const { profile } = this.props.profile;
    const { user } = this.props.auth;
    return (
      <div className="column is-one-third-tablet is-one-quarter-desktop">
        <ProfileUser profile={profile} />
        <ProfileBio user={user} />
        <ProfileDanceExperience experience={profile.danceexperience} />
      </div>
    );
  }
}

const mapStateToPProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToPProps)(ProfileImage);
