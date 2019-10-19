import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import moment from "moment";
import classnames from "classnames";
import { Image, Transformation } from "cloudinary-react";

import { deleteReview } from "../../actions/venueActions";

class ShowVenueReviews extends Component {
  onDeleteClick(venueId, reviewId) {
    this.props.deleteReview(venueId, reviewId);
  }

  render() {
    const { venue } = this.props.venue;
    const { user, isAuthenticated } = this.props.auth;
    return (
      <div className="column is-12-mobile is-12-tablet is-8-desktop box">
        {venue.reviews.length > 0 ? (
          venue.reviews.map(userReview => (
            <article key={userReview._id} className="media">
              <figure className="media-left">
                <p className="image is-48x48">
                  <Image
                    cloudName={process.env.REACT_APP_CLOUDINARY_API_CLOUD_NAME}
                    publicId={userReview.photo}
                  >
                    <Transformation
                      width="200"
                      height="200"
                      crop="fill"
                      radius="max"
                      gravity="faces"
                      quality="auto:best"
                      fetch_format="auto"
                    />
                  </Image>
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>
                      <Link
                        to={`/profile/${userReview.name}`}
                        className="has-text-dark"
                      >
                        {userReview.name}
                      </Link>
                    </strong>
                  </p>
                  <p className="small-margin-top-btm">{userReview.text}</p>

                  <small> Posted {moment(userReview.date).fromNow()}</small>
                </div>
              </div>

              <div
                className={classnames(
                  "media-right has-text-dark  content-is-centered is-size-4",
                  {
                    "has-background-success": parseInt(userReview.rating) >= 7
                  },
                  {
                    "has-background-warning": parseInt(userReview.rating) <= 6
                  },
                  {
                    "has-background-danger": parseInt(userReview.rating) < 4
                  }
                )}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%"
                }}
              >
                {userReview.rating}
              </div>
              {isAuthenticated && user.id === userReview.user && (
                <button
                  onClick={this.onDeleteClick.bind(
                    this,
                    venue._id,
                    userReview._id
                  )}
                  className="delete has-background-danger"
                >
                  Delete
                </button>
              )}
            </article>
          ))
        ) : (
          <p>No one has added any reviews yet. Be the first!</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  venue: state.venue,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteReview }
)(ShowVenueReviews);
