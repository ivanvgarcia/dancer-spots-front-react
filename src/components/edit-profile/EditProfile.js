import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextEditor from "../common/TextEditor";
import SelectFieldGroup from "../common/SelectFieldGroup";
import InputGroup from "../common/InputGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

let defaultOptions;

let options = [
  { value: "bachata", label: "Bachata" },
  { value: "salsa", label: "Salsa" },
  { value: "merengue", label: "Merengue" },
  { value: "cha cha", label: "Cha cha" },
  { value: "kizomba", label: "Kizomba" },
  { value: "tango", label: "Tango" }
];

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      username: "",
      city: "",
      state: "",
      bio: "",
      dance: "",
      youtube: "",
      facebook: "",
      twitter: "",
      instagram: "",
      defaultOptions: [],
      website: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      const profile = this.props.profile.profile;

      const city = profile.location.split(",")[0];
      const state = profile.location.split(",")[1].trim();

      if (profile) {
        defaultOptions = options.filter(option =>
          profile.dance.includes(option.value) ? option : null
        );
      }

      const dances = defaultOptions.map(option => option.value).join(",");

      const inputFields = ["location", "bio"];
      const socialAccounts = [
        "website",
        "youtube",
        "twitter",
        "facebook",
        "instagram"
      ];

      // If profile field doesn't exist, make it into an empty string
      const setFields = field => {
        profile[field] = !isEmpty(profile[field]) ? profile[field] : "";
      };

      const setSocial = socialMedia => {
        profile.social = !isEmpty(profile.social) ? profile.social : {};

        profile.social[socialMedia] = !isEmpty(profile.social[socialMedia])
          ? profile.social[socialMedia]
          : "";
      };

      inputFields.forEach(field => setFields(field));
      socialAccounts.forEach(account => setSocial(account));

      // Set component fields state
      this.setState({
        username: profile.username,
        website: profile.social.website,
        city: city,
        state: state,
        bio: profile.bio,
        dance: dances,
        defaultOptions: defaultOptions,
        twitter: profile.social.twitter,
        facebook: profile.social.facebook,
        instagram: profile.social.instagram,
        youtube: profile.social.youtube
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      username: this.state.username,
      location: `${this.state.city}, ${this.state.state}`,
      bio: this.state.bio,
      dance: this.state.dance,
      website: this.state.website,
      youtube: this.state.youtube,
      facebook: this.state.facebook,
      twitter: this.state.twitter,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
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
                Edit Your Profile
              </h1>
              <small className="tag is-primary">* = required fields</small>
              <form onSubmit={this.onSubmit} className="margin-top-btm">
                <TextFieldGroup
                  name="username"
                  value={this.state.username}
                  onChange={this.onUsernameChange}
                  error={errors.username}
                  label="username"
                  labelText="Username"
                  info="You cannot change your username"
                  disabled={"disabled"}
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
                {this.state.defaultOptions.length > 0 && (
                  <SelectFieldGroup
                    onChange={this.onSelectChange}
                    error={errors.dance}
                    label="dance"
                    labelText="What do you know how to dance?"
                    options={options}
                    defaultOptions={this.state.defaultOptions}
                  />
                )}
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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
