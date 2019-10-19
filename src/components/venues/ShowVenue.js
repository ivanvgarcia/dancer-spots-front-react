import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getCurrentVenue,
  favoriteVenue,
  addReview
} from '../../actions/venueActions';
import PropTypes from 'prop-types';
import MetaTags from 'react-meta-tags';

import classnames from 'classnames';
import moment from 'moment';
import { Image, Transformation } from 'cloudinary-react';

import Loader from '../common/Loader';
import ShowVenueEventList from '../../components/venues/ShowVenueEventList';
import ProfileEventCard from '../../components/profile/ProfileEventCard';
import ShowVenueReviews from './ShowVenueReviews';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import SocialMediaButtons from '../common/SocialMediaButtons';

class ShowVenue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      rating: ''
    };
  }

  componentDidMount() {
    const { venue } = this.props.venue;

    (!venue || venue._id !== this.props.computedMatch.params.id) &&
      this.props.getCurrentVenue(this.props.computedMatch.params.id);
  }

  onAddReviewClick(id) {
    const newReview = {
      text: this.state.text,
      rating: this.state.rating
    };

    this.props.addReview(newReview, id);
    this.setState({ text: '', rating: '' });
  }

  onTextChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onRatingChange(e) {
    const rating = e.target.value;
    if (rating.match(/^\d{0,2}(\.\d{0,1})?$/)) {
      this.setState({ [e.target.name]: rating });
    }
  }

  onFavoriteClick(id) {
    this.props.favoriteVenue(id);
  }

  renderEvents = (venue, user) => {
    return venue.eventlist.length > 0 ? (
      venue.eventlist.map(
        event =>
          moment().format('MMMM') !==
            moment(event.dateofevent).format('MMMM') && (
            <ProfileEventCard key={event._id} event={event} user={user} />
          )
      )
    ) : (
      <div className="column has-text-white">
        <p>
          No events have been added yet. If you are an instructor please{' '}
          <Link to="/register" className="has-text-info">
            sign up
          </Link>{' '}
          to add an event!
        </p>
      </div>
    );
  };

  renderEventInfo = (venue, user) => {
    return venue.eventlist.length > 0 ? (
      venue.eventlist.map(
        event =>
          moment().format('MMMM') ===
            moment(event.dateofevent).format('MMMM') && (
            <ShowVenueEventList
              key={event._id}
              event={event}
              user={user}
              venue={venue}
            />
          )
      )
    ) : (
      <div className="column has-text-white">
        No events have been added yet. If you are an instructor please{' '}
        <Link to="/register" className="has-text-info">
          sign up
        </Link>{' '}
        to add an event!
      </div>
    );
  };

  removeTags = html => {
    const regex = /(<([^>]+)>)/gi;
    return html.replace(regex, '');
  };

  render() {
    const { venue, loadingVenue } = this.props.venue;
    const { user, isAuthenticated } = this.props.auth;
    const { errors } = this.props;

    let venueContent;

    if (loadingVenue) {
      venueContent = <Loader />;
    } else if (venue) {
      // Split the address in order to encode it into a searchable Google Map URL
      const address = venue.address.split(',');
      const city = address[1];
      const state = address[2];
      const fulladdress = address[0];

      // Sum all the ratings and get the average.
      let totalRatings = venue.reviews.map(review =>
        parseInt(review.rating, 10)
      );

      let numOfRatings = totalRatings.length;
      totalRatings = totalRatings.reduce((acc, val) => {
        return acc + val;
      }, 0);

      let averageRating = Number((totalRatings / numOfRatings).toFixed(1));

      venueContent = (
        <div className="show-venue">
          <MetaTags>
            <title>
              {venue.name} |{' '}
              {this.removeTags(venue.description).substring(0, 100)}
            </title>
            <meta
              name="description"
              content={this.removeTags(venue.description)}
            />
            <meta property="og:title" content={venue.name} />
            <meta property="og:image" content={venue.photo} />
          </MetaTags>
          <section className="hero is-bold is-dark">
            <div className="columns">
              <div className="column is-half">
                <figure className="image">
                  <Image
                    cloudName={process.env.REACT_APP_CLOUDINARY_API_CLOUD_NAME}
                    publicId={venue.photo}
                  >
                    <Transformation
                      width="1000"
                      height="700"
                      dpr="auto"
                      gravity="auto"
                      crop="fill"
                      quality="auto"
                    />
                  </Image>
                </figure>
              </div>
              <div className="column is-half content-is-centered show-venue-info">
                <h1 className="title is-size-5-tablet is-size-4-mobile is-size-3-desktop  ">
                  {venue.name}
                </h1>
                {venue.address.length > 4 ? (
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${city}+${state}+${fulladdress.trim()}&travelmode=transit`}
                    className="subtitle has-text-info is-size-6-tablet is-size-7-mobile"
                  >
                    <i
                      className="fas fa-map-marker-alt"
                      style={{ marginLeft: '5px' }}
                    />
                    {venue.address}
                  </a>
                ) : (
                  <em className="subtitle has-text-info is-size-6-tablet is-size-7-mobile">
                    Please add a full address
                  </em>
                )}

                <p className="subtitle has-text-grey has-text-centered is-marginless">
                  {' '}
                  <i
                    onClick={this.onFavoriteClick.bind(this, venue._id)}
                    className={classnames(
                      'far fa-heart is-marginless is-block has-text-white',
                      {
                        'fa fa-heart has-text-danger':
                          venue.favorite.filter(
                            favorite => favorite.user === user.id
                          ).length > 0
                      }
                    )}
                    aria-hidden="true"
                    style={{ cursor: 'pointer' }}
                  />
                  <small className="is-size-7 has-text-white">
                    {venue.favorite.length} dancer(s) favorited {venue.name}
                  </small>
                </p>
                <div className="venue-rating half-highlight">
                  Rated a{' '}
                  <span className="is-size-5">
                    {averageRating ? averageRating : 0}
                  </span>{' '}
                  by {numOfRatings} dancer(s).
                </div>
                <SocialMediaButtons venue={venue._id} />

                {venue.user === user.id && (
                  <div className="">
                    <Link
                      to={`/venue/edit-venue/${venue._id}`}
                      className="venue-item-button has-text-white"
                    >
                      <i
                        className="fas fa-edit has-text-white"
                        aria-hidden="true"
                      />
                      Edit
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </section>
          <section className="section has-background-white">
            <div className="container">
              <div className="columns is-multiline content-is-centered">
                <div className="column is-8">
                  <h2 className="title is-3 is-spaced has-text-centered-mobile has-text-weight-light content-is-centered">
                    About {venue.name}{' '}
                    <span className="tags has-addons margin-top has-text-dark">
                      <span className="tag is-dark is-medium">Price </span>
                      <span className="tag is-primary is-medium">
                        {venue.price}
                      </span>
                    </span>
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: venue.description }}
                    className="has-text-left"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="section has-background-primary-light">
            <div className="container">
              <div className="columns is-centered is-multiline">
                <div className="column is-full">
                  <h2 className="title has-text-white has-text-centered">
                    {moment().format('MMMM')} Events
                  </h2>
                </div>
                {this.renderEventInfo(venue, user)}
              </div>
              <div className="columns is-multiline is-centered">
                <div className="column is-full">
                  <h2 className="title has-text-white has-text-centered">
                    Previous Events
                  </h2>
                </div>
                <div className="columns is-multiline">
                  {this.renderEvents(venue, user)}
                </div>

                <div className="column is-full  content-is-centered">
                  <Link to={`/events/all`} className="button is-success">
                    See All Events
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section className="section has-background-white">
            <div className="container">
              <div className="columns content-is-centered">
                <h5 className="title is-3">Reviews</h5>
                <ShowVenueReviews />
                <div className="column is-12-mobile is-12-tablet is-8-desktop">
                  {isAuthenticated ? (
                    <article className="media">
                      <figure className="media-left mobile">
                        <p className="image is-64x64">
                          <Image
                            cloudName={
                              process.env.REACT_APP_CLOUDINARY_API_CLOUD_NAME
                            }
                            publicId={user.photo}
                          >
                            <Transformation
                              width="200"
                              height="200"
                              crop="fill"
                              radius="max"
                              gravity="faces"
                              quality="auto:best"
                              fetch_format="auto"
                            />
                          </Image>
                        </p>
                      </figure>
                      <div className="media-content">
                        <TextAreaFieldGroup
                          name="text"
                          value={this.state.text}
                          onChange={this.onTextChange.bind(this)}
                          placeholder="Leave a review..."
                          error={errors.text}
                          label="text"
                          labelText="Review"
                        />
                        <TextFieldGroup
                          name="rating"
                          value={this.state.rating}
                          onChange={this.onRatingChange.bind(this)}
                          error={errors.rating}
                          label="rating"
                          labelText="Rating"
                        />
                        <nav className="level">
                          <div className="level-left">
                            <div className="level-item">
                              <button
                                onClick={this.onAddReviewClick.bind(
                                  this,
                                  venue._id
                                )}
                                className="button is-primary"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </nav>
                      </div>
                    </article>
                  ) : (
                    <p>
                      Please <Link to="/login">sign in</Link> to leave a comment
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }

    return <div>{venueContent}</div>;
  }
}

ShowVenue.propTypes = {
  venue: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getCurrentVenue: PropTypes.func.isRequired,
  favoriteVenue: PropTypes.func.isRequired,
  addReview: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  venue: state.venue,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentVenue, favoriteVenue, addReview }
)(ShowVenue);
