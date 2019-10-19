import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextEditor from "../common/TextEditor";
import InputGroup from "../common/InputGroup";
import { createProfile } from "../../actions/profileActions";
import SelectFieldGroup from "../common/SelectFieldGroup";
import options from '../../data/danceOptions';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      username: "",
      city: "",
      state: "",
      bio: "",
      dance: `${options[0].value},${options[1].value}`,
      youtube: "",
      facebook: "",
      twitter: "",
      instagram: "",
      website: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.profile !== {}) {
      this.props.history.push("/create-my-profile");
    } else {
      this.props.history.push("/myprofile");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      username: this.state.username.trim(),
      location: `${this.state.city.trim()}, ${this.state.state.trim()}`,
      bio: this.state.bio,
      dance: this.state.dance,
      website: this.state.website.trim(),
      youtube: this.state.youtube.trim(),
      facebook: this.state.facebook.trim(),
      twitter: this.state.twitter.trim(),
      instagram: this.state.instagram.trim()
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onEditorChange = value => {
    this.setState({ bio: value });
  };

  onSelectChange(danceArr) {
    let userDances = danceArr.map(dance => dance.value).join(",");
    this.setState({ dance: userDances });
  }

  onUsernameChange(e) {
    const username = e.target.value;
    if (username.match(/^[a-zA-Z0-9]*$/)) {
      this.setState({ [e.target.name]: username });
    }
  }

  render() {
    const { displaySocialInputs } = this.state;
    const { errors } = this.props;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div className="margin-top-btm">
          <InputGroup
            placeholder="Website Profile URL"
            name="website"
            icon="fas fa-globe"
            onChange={this.onChange}
            error={errors.website}
            value={this.state.website}
          />
          <InputGroup
            placeholder="Youtube Profile URL"
            name="youtube"
            icon="fab fa-youtube"
            onChange={this.onChange}
            error={errors.youtube}
            value={this.state.youtube}
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            onChange={this.onChange}
            error={errors.facebook}
            value={this.state.facebook}
          />
          <InputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            icon="fab fa-instagram"
            onChange={this.onChange}
            error={errors.instagram}
            value={this.state.instagram}
          />
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            onChange={this.onChange}
            error={errors.twitter}
            value={this.state.twitter}
          />
        </div>
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="section columns content-is-centered">
            <div className="column is-half">
              <div className="margin-top-btm">
                <Link
                  to="/myprofile"
                  className="button is-small is-primary is-outlined"
                >
                  Go Back
                </Link>
              </div>
              <h1 className="title is-2 has-text-weight-light has-text-centered">
                Create Your Profile
              </h1>
              <p className="subtitle has-text-centered">
                Add your info to create your dance profile
              </p>
              <small className="tag is-primary">* = required fields</small>
              <form onSubmit={this.onSubmit} className="margin-top-btm">
                <TextFieldGroup
                  name="username"
                  value={this.state.username}
                  onChange={this.onUsernameChange}
                  error={errors.username}
                  label="username"
                  labelText="Username"
                  info="Create a unique username"
                />
                <TextFieldGroup
                  name="city"
                  value={this.state.city}
                  onChange={this.onChange}
                  error={errors.city}
                  label="city"
                  labelText="City"
                />
                <TextFieldGroup
                  name="state"
                  value={this.state.state}
                  onChange={this.onChange}
                  error={errors.state}
                  label="state"
                  labelText="State"
                />
                <SelectFieldGroup
                  onChange={this.onSelectChange}
                  error={errors.dance}
                  label="dance"
                  labelText="What do you know how to dance?"
                  options={options}
                />
                <TextEditor
                  value={this.state.bio}
                  onChange={this.onEditorChange}
                  error={errors.bio}
                  label="bio"
                  labelText="Bio"
                  info="Tell us about yourself."
                />
                <button
                  type="button"
                  onClick={() => {
                    this.setState(prevState => ({
                      displaySocialInputs: !prevState.displaySocialInputs
                    }));
                  }}
                  className="button is-primary is-outlined margin-top-btm"
                >
                  Add Social Links
                </button>
                {socialInputs}
                <div>
                  <input
                    type="submit"
                    value="Submit"
                    className="button is-primary"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
