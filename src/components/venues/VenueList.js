import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllVenues } from '../../actions/venueActions';
import ProfileVenueListItem from '../profile/ProfileVenueListItem';
import ProfileColumnRBox from '../profile/ProfileColumnRBox';
import Loader from '../../components/common/Loader';

class VenueList extends Component {
  componentDidMount() {
    this.props.getAllVenues();
  }

  renderContent() {
    const { user, profile, venues, loadingVenue } = this.props;

    let venueContent;

    const noVenues = (
      <div className="column is-full is-size-5 is-size-6-mobile small-margin-top-btm content-is-centered">
        {profile.user.name} has not added any venues
      </div>
    );

    if (loadingVenue) {
      return (venueContent = <Loader />);
    } else if (venues) {
      // Find all the events for the user
      venueContent = venues.filter(venue => venue.user === profile.user._id);

      // If no events, then display this message.
      if (venueContent.length === 0) {
        return (venueContent = noVenues);
      } else {
        // Map through the user venues and display them in the component
        return venueContent
          .slice(0, 4)
          .map(venue => (
            <ProfileVenueListItem
              venue={venue}
              profile={profile}
              user={user}
              key={venue._id}
              size="is-full-tablet is-6-desktop is-4-widescreen"
            />
          ));
      }
    } else if (venues === null) {
      return (venueContent = noVenues);
    }
  }

  addVenueButton() {
    const { user, profile } = this.props;
    return (
      profile.user._id === user.id && (
        <Link to="/venue/add-venue" className="button is-primary is-medium">
          <span className="icon">
            <i className="fas fa-plus" />
          </span>
          <span>Add Venue</span>
        </Link>
      )
    );
  }

  render() {
    const { profile } = this.props;
    return (
      <ProfileColumnRBox
        title={'Venues'}
        user={profile.user}
        renderContent={this.renderContent()}
        addButton={this.addVenueButton()}
      />
    );
  }
}

export default connect(
  null,
  { getAllVenues }
)(VenueList);
