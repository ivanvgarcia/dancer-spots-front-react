import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllEvents } from "../../actions/eventActions";
import ProfileEventCard from "../profile/ProfileEventCard";
import ProfileColumnRBox from "../profile/ProfileColumnRBox";
import Loader from "../../components/common/Loader";

class EventList extends Component {
  componentDidMount() {
    this.props.getAllEvents();
  }

  renderContent() {
    const { user, profile, events, loadingEvent } = this.props;

    let eventContent;
    const noEvents = (
      <div className="column is-full is-size-5 is-size-6-mobile small-margin-top-btm content-is-centered">
        {profile.user.name} has not added any events
      </div>
    );
    if (loadingEvent) {
      return (eventContent = <Loader />);
    } else if (events === null) {
      return (eventContent = noEvents);
    } else if (events) {
      // Find all the events for the user
      eventContent = events.paginatedEvents.filter(
        event => event.host._id === profile.user._id
      );
      // If no events, then display this message.
      if (eventContent.length === 0) {
        return (eventContent = noEvents);
      } else {
        // Map through the user events and display them
        return (eventContent = eventContent
          .slice(0, 4)
          .map(event => (
            <ProfileEventCard
              event={event}
              profile={profile}
              user={user}
              key={event._id}
            />
          )));
      }
    }
  }

  addEventButton() {
    const { user, profile } = this.props;

    return (
      profile.user._id === user.id && (
        <Link to="/event/add-event" className="button is-primary is-medium">
          <span className="icon">
            <i className="fas fa-plus" />
          </span>
          <span>Add Event</span>
        </Link>
      )
    );
  }

  render() {
    const { profile } = this.props;

    return (
      <ProfileColumnRBox
        title={"Events"}
        user={profile.user}
        renderContent={this.renderContent()}
        addButton={this.addEventButton()}
      />
    );
  }
}

export default connect(
  null,
  { getAllEvents }
)(EventList);
