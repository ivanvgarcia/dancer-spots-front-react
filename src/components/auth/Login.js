import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { ReactComponent as Salsa } from "../notfound/salsa.svg";

import Header from "../common/Header";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/myprofile");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/myprofile");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userdata = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userdata);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Header
          title="Login to Dancer Spots"
          subtitle="A place for dancers to find their next dance spot at home or abroad"
          color="is-primary is-bold"
        />

        <div
          className="columns is-mobile is-centered margin-top-btm-lg"
          style={{ marginTop: "100px" }}
        >
          <div className="column is-4-widescreen is-half-tablet is-11-mobile">
            <form onSubmit={this.onSubmit} className="box login-form">
              <Salsa className="login-image" />
              <TextFieldGroup
                label="email"
                labelText="Email"
                placeholder="ivangarcia@gmail.com"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
              />
              <TextFieldGroup
                label="password"
                labelText="Password"
                placeholder="Secure Password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
                type="password"
              />
              <div className="field">
                <div className="control">
                  <button className="button is-primary" type="submit">
                    Login
                  </button>
                </div>
              </div>
            </form>
            <div className="flex">
              <div className="has-text-centered is-paddingless">
                <Link to="/forgotpassword">Forgot Password</Link>
              </div>

              <div className="has-text-centered is-paddingless">
                <span>Don't have an account yet? </span>
                <Link to="/register">Sign up!</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
