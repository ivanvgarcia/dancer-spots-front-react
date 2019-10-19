import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { deleteComment } from '../../actions/profileActions';
import { Image, Transformation } from 'cloudinary-react';

class ShowProfileComments extends Component {
  onDeleteClick(profileId, commentId) {
    this.props.deleteComment(profileId, commentId);
  }

  render() {
    const { profile } = this.props.profile;
    const { user, isAuthenticated } = this.props.auth;

    return (
      <div>
        {profile.comments.length > 0 ? (
          profile.comments.map(comment => (
            <article key={comment._id} className="media">
              <figure className="media-left">
                <p className="image is-48x48">
                  <Image
                    cloudName={process.env.REACT_APP_CLOUDINARY_API_CLOUD_NAME}
                    publicId={comment.photo}
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
                        to={`/profile/${comment.user}`}
                        className="has-text-dark"
                      >
                        {comment.name}
                      </Link>
                    </strong>
                  </p>
                  <p className="small-margin-top-btm">{comment.text}</p>

                  <small> Posted {moment(comment.date).fromNow()}</small>
                </div>
              </div>
              {isAuthenticated && user.id === comment.user && (
                <button
                  onClick={this.onDeleteClick.bind(
                    this,
                    profile._id,
                    comment._id
                  )}
                  className="delete has-background-danger"
                >
                  Delete
                </button>
              )}
            </article>
          ))
        ) : (
          <p>No one has added any comments yet. Be the first!</p>
        )}
      </div>
    );
  }
}

ShowProfileComments.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    deleteComment
  }
)(ShowProfileComments);
