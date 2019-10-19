import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileActions from "./ProfileActions";
import { Image, Transformation } from "cloudinary-react";
import { Link } from "react-router-dom";

class ProfileUser extends Component {
  render() {
    const { profile } = this.props;
    const { user } = this.props.auth;

    return (
      <div className="card has-small-padding-btm">
        <header className="card-header has-background-primary ">
          <p className="card-header-title is-centered title is-5 has-text-white has-text-weight-light is-marginless">
            {(profile && profile.user.name) || user.name}
          </p>
          {profile && profile.user._id === user.id && (
            <Link
              to={`/profile/edit/${user.id}`}
              className="card-header-icon"
              aria-label="more options"
            >
              <span className="icon has-text-white">
                <i className="fas fa-pen" aria-hidden="true" />
              </span>
            </Link>
          )}
        </header>
        <div className="card-image content-is-centered margin-top-btm">
          <figure className="image is-128x128">
            <Image
              cloudName={process.env.REACT_APP_CLOUDINARY_API_CLOUD_NAME}
              publicId={
                (profile && profile.user.photo) || (!profile && user.photo)
              }
            >
              <Transformation
                width="200"
                height="200"
                crop="fill"
                radius="max"
                gravity="faces"
                quality="auto:best"
                fetch_format="auto"
                responsive
              />
            </Image>
          </figure>
        </div>
        <div className="card-content is-paddingless margin-top-btm ">
          <div className="content has-text-centered">
            {profile && profile.location ? (
              <p className="title is-5 has-text-weight-light">
                {profile.location}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <ProfileActions />
      </div>
    );
  }
}

const mapStateToPProps = state => ({
  auth: state.auth
});

export default connect(mapStateToPProps)(ProfileUser);
