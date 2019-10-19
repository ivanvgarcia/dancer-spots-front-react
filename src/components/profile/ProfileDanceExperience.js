import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileActions";

class ProfileDanceExperience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

  renderExperienceContent = experiences => {
    return experiences.length > 0 ? (
      <div className="margin-top-btm">
        <div className="card ">
          <header className="card-header">
            <h2 className="card-header-title title is-4 has-text-weight-light has-text-primary is-centered">
              Dance Experience
            </h2>
          </header>
        </div>
        <div className="">{experiences}</div>
      </div>
    ) : null;
  };

  render() {
    const experiences = this.props.experience.map(exp => (
      <div className="card" key={exp._id}>
        <header className="card-header has-background-info">
          <p className="card-header-title">{exp.studioname}</p>
          <button
            onClick={this.onDeleteClick.bind(this, exp._id)}
            className="card-header-icon"
            aria-label="more options"
            style={{ border: "none", background: "none" }}
          >
            <span className="icon">
              <i className="fas fa-times has-text-danger" aria-hidden="true" />
            </span>
          </button>
        </header>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p>{exp.location.length > 2 ? exp.location : null}</p>
            </div>
          </div>
          <div className="content">
            {exp.description ? (
              exp.description
            ) : (
              <p>User has not added a description</p>
            )}
            <br />
            <time className="tag is-dark margin-top-btm">
              <Moment format="MMMM, YYYY">{exp.from}</Moment>
            </time>{" "}
            -{" "}
            <time className="tag is-primary">
              {exp.to === null ? (
                "Current"
              ) : (
                <Moment format="MMMM, YYYY">{exp.to}</Moment>
              )}
            </time>
          </div>
        </div>
      </div>
    ));

    return this.renderExperienceContent(experiences);
  }
}

ProfileDanceExperience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(ProfileDanceExperience);
