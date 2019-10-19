import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getAllProfiles,
  filterProfilesByName
} from '../../actions/profileActions';
import Loader from '../common/Loader';
import UserProfileCardItem from './UserProfileCardItem';
import TextFieldGroup from '../common/TextFieldGroup';

class UserProfileCardList extends Component {
  state = {
    filter: ''
  };
  componentDidMount() {
    this.props.getAllProfiles();
  }

  onSearchChange = async e => {
    const { profiles } = this.props.profile;

    await this.setState({ [e.target.name]: e.target.value });

    this.props.filterProfilesByName(profiles, this.state.filter.toLowerCase());
  };

  renderProfiles = () => {
    const { profiles, loading, filteredByName } = this.props.profile;
    let profilesDisplay;

    if (profiles === null || loading) {
      profilesDisplay = <Loader />;
    } else {
      profilesDisplay = profiles.map(profile => (
        <UserProfileCardItem key={profile._id} profile={profile} />
      ));
    }

    if (filteredByName && filteredByName.length > 0) {
      profilesDisplay = filteredByName.map(profile => (
        <UserProfileCardItem key={profile._id} profile={profile} />
      ));
    }
    return profilesDisplay;
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="section">
        <div className="container">
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <p className="subtitle is-5">Connect with Dancers</p>
              </div>
              <div className="level-item">
                <div className="field has-addons">
                  <div className="control">
                    <TextFieldGroup
                      name="filter"
                      value={this.state.filter}
                      onChange={this.onSearchChange}
                      label="filter"
                      placeholder="Type a Username"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="level-right">
              {/* <div className="level-item">
                <div className="field">
                  <div className="control">
                    <div className="select is-primary">
                      <select>
                        <option>Find by Location</option>
                        <option>With options</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div> */}
              {!isAuthenticated && (
                <div className="level-item">
                  <Link to="/register" className="button is-success">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </nav>
          <div className="user-profiles-list columns is-multiline is-variable is-4">
            {this.renderProfiles()}
          </div>
        </div>
      </div>
    );
  }
}

UserProfileCardList.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAllProfiles, filterProfilesByName }
)(UserProfileCardList);
