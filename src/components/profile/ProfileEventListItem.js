import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEvent } from '../../actions/eventActions';

class ProfileEventListItem extends Component {
  onDeleteClick(id) {
    this.props.deleteEvent(id);
  }

  render() {
    const { event, profile, user } = this.props;

    return (
      <div className="column is-full-tablet is-6-desktop">
        <div className="card">
          <header className="card-header has-background-light">
            <p className="card-header-title has-text-weight-light is-uppercase is-centered">
              {event.name}
            </p>
            {event.host === user.id && (
              <div>
                <Link
                  to={`/event/edit-event/${event._id}`}
                  className="card-header-icon "
                  style={{ padding: '0', border: 'none' }}
                >
                  <span className="icon ">
                    <i
                      className="fas fa-edit has-text-dark"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
                <button
                  onClick={this.onDeleteClick.bind(this, event._id)}
                  className="card-header-icon"
                  style={{ padding: '0', border: 'none' }}
                >
                  <span className="icon ">
                    <i
                      className="fas fa-times has-text-danger "
                      aria-hidden="true"
                    />
                  </span>
                </button>
              </div>
            )}
          </header>
          <div className="card-content">
            <div className="columns">
              <div className="column is-4">
                <p className="image">
                  <img src={event.photo} alt={event.name} />
                </p>
              </div>
              <div className="column is-8 content-is-centered">
                <p className="title is-5 has-text-weight-light">
                  <Link
                    to={`/profile/${profile.username}`}
                    className="level-item has-text-primary"
                    style={{ display: 'flex', alignItem: 'center' }}
                  >
                    Posted By {event.host.name}{' '}
                  </Link>
                </p>
                <p className="subtitle is-6">
                  On <Moment format="MMMM DD, YYYY">{event.dateofevent}</Moment>
                </p>
              </div>{' '}
            </div>

            <div className="content">
              <p className="">
                <i className="fa fa-map-marker-alt" />
                {event.venue ? event.venue.name : 'Unknown'}, {event.address}
              </p>
              <p className="small-margin-top-btm">
                <i className="fa fa-info" style={{ marginLeft: '3px' }} />
                {event.description.substring(0, 100)}
                {'...'}
              </p>
            </div>
          </div>

          <footer className="card-footer has-background-light">
            <div className="card-footer-item is-paddingless">
              <Link
                to={`/event/${event._id}`}
                className="button is-primary is-fullwidth is-radiusless"
              >
                Show More
              </Link>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteEvent }
)(withRouter(ProfileEventListItem));
