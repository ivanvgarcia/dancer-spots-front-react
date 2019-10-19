import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Image, Transformation } from 'cloudinary-react';

class ShowVenueEventList extends Component {
  renderEdit = ({ event, user }) => {
    return (
      event.host._id === user.id && (
        <span className="event-card-info__edit">
          <Link to={`/event/edit-event/${event._id}`}>
            <i className="fas fa-edit has-text-primary" aria-hidden="true" />
          </Link>
        </span>
      )
    );
  };

  render() {
    const { event, venue } = this.props;

    // Split the address in order to encode it into a searchable Google Map URL
    const address = event.address.split(',');
    const city = address[1];
    const state = address[2];
    const fulladdress = address[0];

    return (
      <div className="column is-10-widescreen is-full-tablet margin-top-btm">
        <article className="event-card-info box is-paddingless">
          <Link to={`/event/${event._id}`} className="event-card-info__link" />
          <div className="event-card-info__media">
            <figure className="image">
              <Image
                cloudName={process.env.REACT_APP_CLOUDINARY_API_CLOUD_NAME}
                publicId={event.photo}
              >
                <Transformation
                  width="450"
                  height="310"
                  quality="auto:best"
                  drp="auto"
                  crop="fill"
                  fetch_format="auto"
                />
              </Image>
            </figure>
          </div>
          <div className="event-card-info__description">
            <div className="content">
              <h3 className="event-card-info__name">
                {event.name} @{' '}
                <Link
                  to={`/venue/${(venue && venue._id) ||
                    (event.venue && event.venue._id)}`}
                >
                  {(venue && venue.name) || (event.venue && event.venue.name)}
                </Link>
                {this.renderEdit(this.props)}
              </h3>
              <span className="event-card-info__address">
                <i className="fas fa-map-marker-alt" />
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${city}+${state}+${fulladdress.trim()}&travelmode=transit`}
                >
                  {event.address}
                </a>
              </span>

              {event.summary ? (
                <p>{event.summary}</p>
              ) : (
                <div
                  className="small-margin-top"
                  dangerouslySetInnerHTML={{
                    __html: event.description.substring(0, 100)
                  }}
                />
              )}
            </div>

            <div className="small-margin-top-btm">
              <small className="tags has-addons is-inline">
                <span className="tag is-info has-text-dark">
                  On {moment(event.dateofevent).format('MMMM DD, YYYY')}
                </span>
                <span className="tag is-dark">
                  {moment(event.starttime).format('h:mm a')}
                </span>
                <span className="tag is-primary">
                  {moment(event.endtime).format('h:mm a')}
                </span>
              </small>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default ShowVenueEventList;
