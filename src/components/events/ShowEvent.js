import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentEvent } from '../../actions/eventActions';
import { getProfileByID } from '../../actions/profileActions';
import Loader from '../common/Loader';
import moment from 'moment';
import isEmpty from '../../validation/is-empty';
import NotFound from '../notfound/NotFound';
import { Image, Transformation } from 'cloudinary-react';
import SocialMediaButtons from '../common/SocialMediaButtons';

import MetaTags from 'react-meta-tags';

export class ShowEvent extends Component {
  componentDidMount() {
    const { event } = this.props.event;

    (!event || event._id !== this.props.computedMatch.params.id) &&
      this.props.getCurrentEvent(this.props.computedMatch.params.id);
  }

  getProfile(id) {
    this.props.getProfileByID(id);
  }

  onFavoriteClick() {
    console.log('submit');
  }

  removeTags = html => {
    const regex = /(<([^>]+)>)/gi;
    return html.replace(regex, '');
  };

  render() {
    const { event, loadingEvent } = this.props.event;

    let eventContent;

    if (loadingEvent) {
      eventContent = <Loader />;
    } else if (isEmpty(event)) {
      eventContent = <NotFound />;
    } else if (event && event.venue) {
      // Split the address in order to encode it into a searchable Google Map URL

      // Sum all the ratings and get the average.
      let totalRatings = event.venue.reviews.map(review =>
        parseInt(review.rating, 10)
      );

      let numOfRatings = totalRatings.length;
      totalRatings = totalRatings.reduce((acc, val) => {
        return acc + val;
      }, 0);

      let averageRating = Number((totalRatings / numOfRatings).toFixed(1));

      eventContent = (
        <div className="show-event">
          <MetaTags>
            <title>
              {event.name} |{' '}
              {this.removeTags(event.description).substring(0, 150)}
            </title>
            <meta
              name="description"
              content={this.removeTags(event.description)}
            />
            <meta property="og:title" content={event.name} />
            <meta property="og:image" content={event.photo} />
          </MetaTags>

          <div className="section">
            <div className="container">
              <div className="columns ">
                <div className="column has-text-centered">
                  <h1 className="title is-size-4-mobile is-size-3-desktop  is-marginless">
                    {event.name} Details
                  </h1>
                  {event.address.length > 0 ? (
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${event.address}&travelmode=transit`}
                      className="subtitle has-text-primary is-size-6-tablet is-size-7-mobile "
                    >
                      <i className="fas fa-map-marker-alt" />
                      {event.address}
                    </a>
                  ) : (
                    <em className="subtitle has-text-info is-size-6-tablet is-size-7-mobile">
                      Please add a full address
                    </em>
                  )}
                  <div className="tags has-addons is-centered margin-top-btm">
                    <span className="tag is-dark is-marginless">
                      {moment(event.starttime).format('h:mm a')}
                    </span>
                    <span className="tag is-primary is-marginless">
                      {moment(event.endtime).format('h:mm a')}
                    </span>
                  </div>
                  <SocialMediaButtons event={event._id} />
                  {/* <p className="subtitle has-text-grey has-text-centered small-margin-top-btm">
                    {" "}
                    <i
                      onClick={this.onFavoriteClick.bind(this, event._id)}
                      className={classnames(
                        "far fa-heart is-marginless is-block has-text-dark",
                        {
                          "fa fa-heart has-text-danger":
                            event.favorite.filter(
                              favorite => favorite.user === user.id
                            ).length > 0
                        }
                      )}
                      aria-hidden="true"
                      style={{ cursor: "pointer" }}
                    />
                    <small className="is-size-7 has-text-dark">
                      {event.favorite.length} dancer(s) favorited {event.name}
                    </small>
                  </p> */}
                  <div
                    dangerouslySetInnerHTML={{ __html: event.description }}
                    className="has-text-left"
                  />
                </div>
                <div className="column is-5">
                  <figure className="image">
                    <Image
                      cloudName={
                        process.env.REACT_APP_CLOUDINARY_API_CLOUD_NAME
                      }
                      publicId={event.photo}
                    >
                      <Transformation
                        width="800"
                        height="800"
                        crop="fit"
                        dpr="auto"
                        quality="auto:best"
                        fetch_format="auto"
                        responsive
                      />
                    </Image>
                  </figure>
                  <div
                    className="columns margin-top has-background-primary"
                    style={{ margin: '0rem 0rem', padding: '1em' }}
                  >
                    <div className="column is-6 content-is-centered">
                      <figure className="image is-96x96 ">
                        <Link
                          to={`/profile/${event.host._id}`}
                          className="has-text-white"
                        >
                          <Image
                            cloudName={
                              process.env.REACT_APP_CLOUDINARY_API_CLOUD_NAME
                            }
                            publicId={event.host.photo}
                            style={{
                              boxShadow: '0 4px 8px #000',
                              borderRadius: '50%',
                              border: '2px solid white'
                            }}
                          >
                            <Transformation
                              width="150"
                              height="150"
                              crop="fill"
                              dpr="auto"
                              quality="auto:best"
                              fetch_format="auto"
                              responsive
                              gravity="faces"
                              background="#f8f8f8"
                            />
                          </Image>
                        </Link>
                      </figure>
                    </div>
                    <div className="column is-6 content-is-centered">
                      <h2
                        className="title is-5 has-text-white has-text-centered"
                        style={{ letterSpacing: '1px', lineHeight: '1.4em' }}
                      >
                        Posted by{' '}
                        <Link
                          to={`/profile/${event.host._id}`}
                          className="has-text-white is-size-5"
                        >
                          {event.host.name}
                        </Link>
                      </h2>
                    </div>
                  </div>
                  <figure className="image">
                    <Image
                      cloudName={
                        process.env.REACT_APP_CLOUDINARY_API_CLOUD_NAME
                      }
                      publicId={event.venue.photo}
                    >
                      <Transformation
                        width="800"
                        height="800"
                        crop="fit"
                        dpr="auto"
                        quality="auto:best"
                        fetch_format="auto"
                        responsive
                      />
                    </Image>
                  </figure>

                  <div className="column has-text-centered">
                    <h2 className="title">
                      Being held at{' '}
                      <Link to={`/venue/${event.venue._id}`}>
                        {event.venue.name}
                      </Link>
                    </h2>
                    <div className="tags has-addons is-centered margin-top-btm">
                      <span className="tag is-dark is-marginless">
                        {event.venue.price}
                      </span>
                      <span className="tag is-primary is-marginless">
                        {averageRating || 'No Reviews'}
                      </span>
                    </div>
                    <div
                      className="has-text-left"
                      dangerouslySetInnerHTML={{
                        __html: event.venue.description
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <div>{eventContent}</div>;
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  event: state.event,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentEvent, getProfileByID }
)(ShowEvent);
