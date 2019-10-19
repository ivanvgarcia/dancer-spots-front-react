import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/myprofile');
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auth.isAuthenticated !== this.props.auth.isAuthenticated) {
      if (this.props.auth.isAuthenticated) {
        this.props.history.push('/myprofile');
      }
    }
  }

  render() {
    return (
      <section className="hero is-primary is-fullheight-with-navbar">
        <div className="hero-body landing-hero">
          <div className="container">
            <h1 className="title is-1">A Bailar!</h1>
            <h1 className="subtitle">
              Find dance venues and events all around the world
            </h1>
            <div className="field is-grouped">
              <p className="control">
                <Link to="/register" className="button is-success">
                  Sign Up
                </Link>
              </p>
              <p className="control">
                <Link to="login" className="button">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
