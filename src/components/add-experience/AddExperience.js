import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import PropTypes from "prop-types";
import { addExperience } from "../../actions/profileActions";

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studioname: "",
      city: "",
      state: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const expData = {
      studioname: this.state.studioname,
      location: `${this.state.city}, ${this.state.state}`,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addExperience(expData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck() {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;
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
                Add Dance Experience
              </h1>
              <p className="subtitle has-text-centered">
                Give us some info about where you learned to dance.
              </p>
              <small className="tag is-primary">* = required fields</small>
              <form onSubmit={this.onSubmit} className="margin-top-btm">
                <TextFieldGroup
                  name="studioname"
                  value={this.state.studioname}
                  onChange={this.onChange}
                  error={errors.studioname}
                  label="studioname"
                  labelText="Studio Name"
                  info="The name of the studio where you danced"
                />
                <TextFieldGroup
                  name="city"
                  value={this.state.city}
                  onChange={this.onChange}
                  error={errors.city}
                  label="city"
                  labelText="City"
                  info="Example: Bronx"
                />
                <TextFieldGroup
                  name="state"
                  value={this.state.state}
                  onChange={this.onChange}
                  error={errors.state}
                  label="state"
                  labelText="State"
                  info="Example: New York"
                />
                <h6>From</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                  label="from"
                />
                <h6>To</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  label="to"
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check margin-top-btm">
                  <label htmlFor="current" className="checkbox">
                    Current Studio{" "}
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="current"
                      value={this.state.current}
                      checked={this.state.current}
                      onChange={this.onCheck}
                      id="current"
                    />
                  </label>
                </div>
                <TextAreaFieldGroup
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  errors={errors.description}
                  label="description"
                  labelText="Tell us about what you learned in the studio"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="button is-primary"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
