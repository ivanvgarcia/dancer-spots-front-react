import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getAllEvents } from '../../actions/eventActions';
import { getAllVenues } from '../../actions/venueActions';

import Loader from '../common/Loader';
import ShowVenueEventList from '../venues/ShowVenueEventList';
import Header from '../common/Header';
import moment from 'moment';
import ProfileEventCard from '../profile/ProfileEventCard';

import MetaTags from 'react-meta-tags';
import { dancerspotsAPI } from '../../config/baseUrl';

const AllEvents = ({
  title,
  description,
  events,
  profile,
  venues,
  loadingEvent,
  isAuthenticated,
  user,
  getAllEvents
}) => {
  const [pagination, setPagination] = useState({
    events: [],
    nextPage: 0,
    previousPage: 0,
    lastPage: 0,
    hasPreviousPage: false,
    hasNextPage: false,
    active: false
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  useEffect(() => {
    events &&
      setPagination({
        events: events.paginatedEvents,
        currentPage: events.currentPage,
        nextPage: events.nextPage,
        previousPage: events.previousPage,
        lastPage: events.lastPage,
        hasPreviousPage: events.hasPreviousPage,
        hasNextPage: events.hasNextPage
      });
  }, [events]);

  const changePage = async nextPage => {
    window.scrollTo(0, 0);

    setIsLoading(true);
    const newEvent = await dancerspotsAPI.get(
      `//www.dancerspots.com/events/all?page=${nextPage}`
    );

    setPagination({
      events: newEvent.data.paginatedEvents,
      currentPage: newEvent.data.currentPage,
      nextPage: newEvent.data.nextPage,
      previousPage: newEvent.data.previousPage,
      lastPage: newEvent.data.lastPage,
      hasPreviousPage: newEvent.data.hasPreviousPage,
      hasNextPage: newEvent.data.hasNextPage
    });
    setIsLoading(false);
  };

  const renderEvents = () => {
    if (loadingEvent) {
      return <Loader />;
    } else if (pagination.events === null) {
      return <p>There are no events to show at this time.</p>;
    } else {
      if (isLoading) {
        return <Loader />;
      }
      if (pagination.events) {
        return pagination.events.map(event => (
          <ShowVenueEventList
            event={event}
            profile={profile}
            user={user}
            key={event._id}
            venue={venues}
          />
        ));
      }
    }
  };

  const renderTodaysEvents = () => {
    if (loadingEvent) {
      return <Loader />;
    } else if (pagination.events) {
      let todaysEvents;
      let today = new Date();
      today = moment(today).format('YYYY-MM-DD');
      todaysEvents = pagination.events.filter(
        event => moment(event.dateofevent).format('YYYY-MM-DD') === today
      );

      if (todaysEvents && todaysEvents.length) {
        console.log(todaysEvents);

        todaysEvents = todaysEvents.map(event => (
          <ProfileEventCard key={event._id} event={event} user={user} />
        ));
      } else if (!todaysEvents.length) {
        todaysEvents = (
          <p className='column is-full has-text-centered'>
            Sorry, There are no events posted for today.{' '}
            {isAuthenticated &&
            (user.isInstructor || user.isAdmin || user.isOwner) ? (
              <Link to='/event/add-event'>Add one!</Link>
            ) : (
              <Link to='/register'>Sign up to add one!</Link>
            )}
          </p>
        );
      }
      return todaysEvents;
    }
  };

  return (
    <div>
      <MetaTags>
        <title>
          {title} | {description}
        </title>
        <meta name='description' content={description} />
        <meta property='og:title' content={title} />
      </MetaTags>
      <Header
        title={title}
        subtitle={description}
        color='is-dark is-bold'
        icon='far fa-calendar-alt'
      />

      <div className='section'>
        <div className='container'>
          <h2 className='title is-3 has-text-centered'>Today's Events</h2>
          <div className='columns'>{renderTodaysEvents()}</div>
          <h2 className='title is-3 has-text-centered'>All Events</h2>
          <div className='columns is-multiline margin-top-btm is-centered'>
            {renderEvents()}
          </div>
          <div className='pagination flex'>
            {pagination.currentPage !== 1 && pagination.previousPage !== 1 && (
              <button
                className='pagination__page'
                onClick={() => changePage(1)}
              >
                1
              </button>
            )}
            {pagination.hasPreviousPage && (
              <button
                className='pagination__page'
                onClick={() => changePage(pagination.previousPage)}
              >
                {pagination.previousPage}
              </button>
            )}
            {pagination.currentPage && (
              <button
                className='pagination__page pagination__active'
                onClick={() => changePage(pagination.currentPage)}
                disabled={true}
              >
                {pagination.currentPage}
              </button>
            )}
            {pagination.hasNextPage && (
              <button
                className='pagination__page'
                onClick={() => changePage(pagination.nextPage)}
              >
                {pagination.nextPage}
              </button>
            )}
            {pagination.lastPage !== pagination.currentPage &&
              pagination.nextPage !== pagination.lastPage && (
                <button
                  className='pagination__page'
                  onClick={() => changePage(pagination.lastPage)}
                >
                  {pagination.lastPage}
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

AllEvents.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  events: PropTypes.object,
  profile: PropTypes.object.isRequired,
  getAllEvents: PropTypes.func.isRequired
};

AllEvents.defaultProps = {
  title: 'Events',
  description: 'Find the most popular dance events anywhere around the world.'
};

const mapStateToProps = state => ({
  user: state.auth.user,
  loadingEvent: state.event.loadingEvent,
  isAuthenticated: state.auth.isAuthenticated,
  events: state.event.events,
  event: state.event.event,
  venue: state.venue,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getAllEvents, getAllVenues }
)(AllEvents);
