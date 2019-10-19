import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { deleteVenue } from '../../actions/venueActions';
import { Image, Transformation } from 'cloudinary-react';

class ProfileVenueListItem extends Component {
  onDeleteClick(id) {
    this.props.deleteVenue(id);
  }

  renderVenueActions() {
    const { venue, user } = this.props;

    return (
      venue.user === user.id && (
        <div className="venue-card__actions">
          <Link to={`/venue/edit-venue/${venue._id}`} className="">
            <span className="icon">
              <i className="fas fa-edit has-text-success" aria-hidden="true" />
            </span>
          </Link>
          <button
            onClick={this.onDeleteClick.bind(this, venue._id)}
            className=""
          >
            <span className="icon ">
              <i className="fas fa-times has-text-danger" aria-hidden="true" />
            </span>
          </button>
        </div>
      )
    );
  }

  render() {
    const { venue, size } = this.props;
    const address = venue.address.split(',');
    const city = address[1];
    const state = address[2];
    const fulladdress = address[0];

    return (
      <div className={`column ${size}`}>
        <div className="venue-card">
          <div className="venue-card__image">
            {this.renderVenueActions()}
            <h3 className="venue-card__title">
              <Link
                to={`/venue/${venue._id}`}
                className="venue-card__link has-text-white"
              >
                {venue.name}
              </Link>
            </h3>
            <Image
              cloudName={process.env.REACT_APP_CLOUDINARY_API_CLOUD_NAME}
              publicId={venue.photo}
            >
              <Transformation
                width="800"
                height="400"
                gravity="auto"
                crop="fill"
                quality="auto:best"
                fetch_format="auto"
                dpr="auto"
                responsive
              />
            </Image>
          </div>
          <div className="venue-card__information">
            <div className="venue-card__address">
              <i className="fas fa-map-marker-alt" />

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${city}+${state}+${fulladdress.trim()}&travelmode=transit`}
                className="venue-card__address has-text-primary"
              >
                {venue.address}
              </a>
            </div>
            {venue.summary ? (
              <p>{venue.summary}</p>
            ) : (
              <div
                className="venue-card__description"
                dangerouslySetInnerHTML={{
                  __html: venue.description.substring(0, 250)
                }}
              />
            )}

            <div className="venue-card__meta">
              <p className="tag is-success">Price {venue.price}</p>

              <p className="tag is-info has-text-dark">
                {venue.reviews.length} Reviews
              </p>
              <Link to={`/venue/${venue._id}`} className="has-text-primary">
                <i className="fas fa-chevron-circle-right is-size-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileVenueListItem.propTypes = {
  deleteVenue: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteVenue }
)(ProfileVenueListItem);
