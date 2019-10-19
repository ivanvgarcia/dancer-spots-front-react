import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteAccount } from "../../actions/profileActions";
import { connect } from "react-redux";

class ProfileActions extends Component {
  onDeleteClick(e) {
    this.props.deleteAccount();
  }
  render() {
    const { profile } = this.props.profile;
    const { user, isAuthenticated } = this.props.auth;

    let profileActions;

    if (
      Object.keys(profile).length > 0 &&
      user.id === profile.user._id &&
      isAuthenticated
    ) {
      profileActions = (
        <div
          className="buttons has-addons content-is-centered margin-top-btm"
          style={{ alignItems: "stretch", padding: "0 1rem" }}
        >
          {Object.keys(profile).length === 0 ? null : (
            <Link
              to="/edit-my-profile"
              className="button is-primary is-outlined is-small"
            >
              <span className="icon is-small">
                <i className="fas fa-pen" />
              </span>
              Edit Profile
            </Link>
          )}

          {Object.keys(profile).length === 0 ? null : (
            <Link
              to="/add-my-danceexperience"
              className="button is-primary is-outlined is-small"
            >
              <span className="icon is-small">
                <i className="fas fa-plus" />
              </span>
              Add Dance Experience
            </Link>
          )}

          <Link
            to="/login"
            onClick={this.onDeleteClick.bind(this)}
            className="button is-danger is-small is-outlined"
          >
            <span className="icon is-small">
              <i className="fas fa-minus" />
            </span>
            Delete Account
          </Link>
        </div>
      );
    } else {
      profileActions = null;
    }

    return profileActions;
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteAccount }
)(ProfileActions);
