import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import upperCaseFirst from "../common/uppercase";
import { Image, Transformation } from "cloudinary-react";

class UserProfileCardItem extends Component {
  render() {
    const { profile } = this.props;

    const dance = profile.dance.slice(0, 2).map((dance, i) => (
      <p
        key={dance[i]}
        dance={dance}
        className="tag is-small is-rounded is-success is-marginless"
      >
        {upperCaseFirst(dance)}
      </p>
    ));

    return (
      <div className="column is-3-widescreen is-3-desktop is-4-tablet">
        <div className="card user-card">
          {profile.user.isInstructor && (
            <div className="user-card__layer">
              <div className="user-card__instructor">Instructor</div>
            </div>
          )}
          <div className="card-header">
            <header className="card-header-title is-centered">
              <h2 className="title is-5">{profile.username.toLowerCase()}</h2>
            </header>
          </div>
          <div className="card-content">
            <figure className="image">
              <Image
                cloudName={process.env.REACT_APP_CLOUDINARY_API_CLOUD_NAME}
                publicId={profile.user.photo}
              >
                <Transformation
                  width="270"
                  height="270"
                  crop="fill"
                  radius="max"
                  quality="auto:best"
                  fetch_format="auto"
                  responsive
                  gravity="faces"
                />
              </Image>
            </figure>
            <div className="content has-text-centered">
              <div className="small-margin-top-btm">
                <p className="is-size-7">
                  Joined {moment(profile.date).format("MMMM DD, YYYY")}
                </p>
                <p className="is-size-7">From {profile.location}</p>
              </div>

              <h4 className="small-margin-top-btm has-text-centered">
                Dance Skills
              </h4>
              <div className="tags has-addons is-centered">{dance}</div>
            </div>
          </div>
          <Link
            to={`/profile/user/${profile.username}`}
            className="button is-fullwidth is-radiusless is-primary"
          >
            See Profile
          </Link>
        </div>
      </div>
    );
  }
}

UserProfileCardItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default connect(null)(UserProfileCardItem);
