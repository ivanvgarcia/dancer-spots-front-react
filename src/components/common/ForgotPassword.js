import React, { Component } from "react";
import TextFieldGroup from "./TextFieldGroup";
import Loader from "../common/Loader";
import Header from "./Header";
import { connect } from "react-redux";
import { getResetPasswordToken } from "../../actions/authActions";

class ForgotPassword extends Component {
  state = {
    email: "",
    errors: {},
    loading: false,
    disableSubmitButton: false
  };

  handleInputChange = e => {
    if (this.state.errors) {
      this.setState({ disableSubmitButton: false, errors: {} });
    }
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    this.setState({ disableSubmitButton: true, loading: true });

    this.props.getResetPasswordToken({
      email: this.state.email
    });
  };

  componentDidUpdate(prevProp, prevState) {
    if (prevProp.errors !== this.props.errors) {
      this.setState({
        errors: this.props.errors,
        loading: false
      });
    }
  }

  renderContent = () => {
    const { disableSubmitButton, loading } = this.state;
    const { sentEmail } = this.props.auth;

    if (sentEmail) {
      return (
        <div>
          <h4 className="title is-3 has-text-primary">Email Sent</h4>
          <p>Please check your email for further instructions.</p>
        </div>
      );
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <TextFieldGroup
            label="email"
            labelText="Email"
            placeholder="ivangarcia@gmail.com"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
            error={this.state.errors.email}
          />
          <button
            type="submit"
            className="button is-primary"
            disabled={disableSubmitButton}
          >
            Reset Password
          </button>
          {loading && (
            <div>
              <p>Sending Email</p>
              <Loader />
            </div>
          )}
        </form>
      );
    }
  };

  render() {
    return (
      <div>
        <Header
          title="Forgot your password"
          subtitle="Fill in the following form to get a new password sent to your registered email."
          color="is-primary is-bold"
        />
        <div
          className="columns is-mobile is-centered"
          style={{ margin: "3em 0" }}
        >
          <div className="column is-4-widescreen is-half-tablet">
            {this.renderContent()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getResetPasswordToken }
)(ForgotPassword);
