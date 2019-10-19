import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { addComment } from "../../actions/profileActions";
import { Image, Transformation } from "cloudinary-react";

import TextAreaFieldGroup from "./TextAreaFieldGroup";

class CommentInput extends Component {
  state = {
    text: "",
    errors: {}
  };

  onAddCommentClick(id) {
    const newComment = {
      text: this.state.text
    };

    this.props.addComment(newComment, id);
    this.setState({ text: "" });
  }

  onTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { profile } = this.props.profile;
    const { user, isAuthenticated } = this.props.auth;
    const { errors } = this.props;

    return (
      <div>
        {isAuthenticated ? (
          <article className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <Image
                  cloudName={process.env.REACT_APP_CLOUDINARY_API_CLOUD_NAME}
                  publicId={user.photo}
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
              </p>
            </figure>

            <div className="media-content">
              <TextAreaFieldGroup
                name="text"
                value={this.state.text}
                onChange={this.onTextChange.bind(this)}
                placeholder="Leave a comment..."
                error={errors.text}
                label="text"
                labelText="Comment"
              />
              <nav className="level">
                <div className="level-left">
                  <div className="level-item">
                    <button
                      onClick={this.onAddCommentClick.bind(this, profile._id)}
                      className="button is-primary"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          </article>
        ) : (
          <p>
            Please <Link to="/login">sign in</Link> to leave a comment
          </p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentInput);
