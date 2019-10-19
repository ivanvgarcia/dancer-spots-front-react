import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deleteEvent } from "../../actions/eventActions";

import Moment from "react-moment";
import { Image, Transformation } from "cloudinary-react";

class ProfileEventCard extends Component {
  onDeleteClick(id) {
    this.props.deleteEvent(id);
  }

  render() {
    const { event, user } = this.props;
    // Split the address in order to encode it into a searchable Google Map URL
    const address = event.address.split(",");
    const city = address[1];
    const state = address[2];
    const fulladdress = address[0];

    return (
      <div className="column is-full-tablet is-half-desktop">
        <div className="event-card">
          <Link to={`/event/${event._id}`} className="event-card__link" />
          {event.host._id === user.id && (
            <div className="event-card__icons">
              <Link
                to={`/event/edit-event/${event._id}`}
                className="event-card__icon "
              >
                <i className="fas fa-edit" aria-hidden="true" />
              </Link>
              <button
                onClick={this.onDeleteClick.bind(this, event._id)}
                className="event-card__icon"
              >
                <i
                  className="fas fa-times has-text-danger "
                  aria-hidden="true"
                />
              </button>
            </div>
          )}
          <div className="event-card__content">
            <h4 className="title is-size-6-mobile is-size-4-tablet is-3 has-text-center">
              {event.name}
            </h4>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${city}+${state}+${fulladdress.trim()}&travelmode=transit`}
              className="subtitle is-size-7-mobile is-size-6-tablet is-size-7-desktop has-text-centered"
            >
              {event.address}
            </a>
            <p className="is-6">
              On <Moment format="MMMM DD, YYYY">{event.dateofevent}</Moment>
            </p>
          </div>
          <Image
            cloudName={process.env.REACT_APP_CLOUDINARY_API_CLOUD_NAME}
            publicId={event.photo}
          >
            <Transformation
              width="1000"
              height="700"
              crop="fill"
              dpr="auto"
              gravity="auto"
              quality="auto:best"
              fetch_format="auto"
              responsive
            />
          </Image>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteEvent }
)(withRouter(ProfileEventCard));
