import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import upperCaseFirst from "../common/uppercase";

class ProfileBio extends Component {
  render() {
    const { profile } = this.props.profile;

    return (
      <div className="card margin-top-btm">
        <header className="card-header has-background-primary">
          <div className="card-header-title is-centered">
            <h1 className="title is-5 has-text-weight-light ">
              <Link
                to={`/profile/${profile.username}`}
                className="has-text-white"
              >
                About Me
              </Link>
            </h1>
          </div>
        </header>
        <div className="card-content">
          <div className="content">
            {profile.bio === "undefined" ? (
              <p>{profile.user.name} has not written a bio yet</p>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: profile.bio }} />
            )}

            <h6 className="title is-5 margin-top-btm has-text-center">
              Dance Skills
            </h6>

            <div className="buttons">
              {profile.dance &&
                profile.dance.map(dance => (
                  <button
                    key={dance}
                    className="button is-small is-info has-text-dark"
                  >
                    {upperCaseFirst(dance)}
                  </button>
                ))}
            </div>
          </div>
        </div>

        {profile.social === undefined ? null : (
          <footer className="card-footer">
            {isEmpty(profile.social.website) ? null : (
              <a
                href={`//${profile.social.website}`}
                className="card-footer-item"
              >
                <i className="fas fa-globe has-text-primary is-marginless" />
              </a>
            )}
            {isEmpty(profile.social.facebook) ? null : (
              <a
                href={`//${profile.social.facebook}`}
                className="card-footer-item"
              >
                <i className="fab fa-facebook is-marginless" />
              </a>
            )}
            {isEmpty(profile.social.youtube) ? null : (
              <a
                href={`//${profile.social.youtube}`}
                className="card-footer-item"
              >
                <i className="fab fa-youtube has-text-danger is-marginless" />
              </a>
            )}
            {isEmpty(profile.social.instagram) ? null : (
              <a
                href={`//${profile.social.instagram}`}
                className="card-footer-item"
              >
                <i className="fab fa-instagram has-text-info is-marginless" />
              </a>
            )}
            {isEmpty(profile.social.twitter) ? null : (
              <a
                href={`//${profile.social.twitter}`}
                className="card-footer-item"
              >
                <i className="fab fa-twitter is-marginless" />
              </a>
            )}
          </footer>
        )}
      </div>
    );
  }
}

ProfileBio.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToPProps = state => ({
  profile: state.profile
});

export default connect(mapStateToPProps)(ProfileBio);
