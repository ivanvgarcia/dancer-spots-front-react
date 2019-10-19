import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllVenues } from '../../actions/venueActions';

import PropTypes from 'prop-types';

import Loader from '../common/Loader';
import ProfileVenueListItem from '../profile/ProfileVenueListItem';
import Header from '../common/Header';

import MetaTags from 'react-meta-tags';

class AllVenues extends Component {
  static defaultProps = {
    title: 'Venues',
    description:
      'Find a fun place to dance tonight. Check out the prices and latest reviews.'
  };
  componentDidMount() {
    if (!this.props.venues) {
      this.props.getAllVenues();
    }
  }

  renderVenues = () => {
    const { profile } = this.props;
    const { user } = this.props.auth;
    const { venues, loadingVenue } = this.props.venue;

    let allVenues;

    if (loadingVenue) {
      allVenues = <Loader />;
    } else if (venues === null) {
      allVenues = <p>There are no venues to show at this time.</p>;
    } else {
      if (venues) {
        // Map through the user venues and display them in the component
        allVenues = venues.map(venue => (
          <ProfileVenueListItem
            venue={venue}
            profile={profile}
            user={user}
            key={venue._id}
            size="is-half-tablet is-4-desktop is-3-widescreen"
          />
        ));
      }
    }
    return allVenues;
  };

  render() {
    const { title, description } = this.props;

    return (
      <div>
        {' '}
        <MetaTags>
          <title>
            {title} | {description}
          </title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
        </MetaTags>
        <Header
          title={title}
          subtitle={description}
          color="is-dark is-bold"
          icon="fas fa-map-marked"
        />
        <div className="section">
          <div className="container">
            <div className="columns is-multiline margin-top-btm is-centered">
              {this.renderVenues()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AllVenues.propTypes = {
  auth: PropTypes.object.isRequired,
  venue: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getAllVenues: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  venue: state.venue,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getAllVenues }
)(AllVenues);
