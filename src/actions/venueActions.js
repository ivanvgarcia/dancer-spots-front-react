import { dancerspotsAPI } from '../config/baseUrl';
import {
  GET_VENUE,
  GET_VENUES,
  VENUE_LOADING,
  GET_ERRORS,
  FILTER_VENUES,
  GET_USER_VENUES
} from '../actions/types';

// Add a venue
export const addVenue = (venueData, history) => dispatch => {
  dancerspotsAPI
    .post('/venues', venueData)
    .then(res => history.push('/myprofile'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete a venue
export const deleteVenue = id => dispatch => {
  if (
    window.confirm(
      'Are you sure you want to delete this venue? This cannot be undone.'
    )
  ) {
    dancerspotsAPI
      .delete(`/venues/venueid/${id}`)
      .then(res =>
        dispatch({
          type: GET_VENUES,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Get current venue
export const getCurrentVenue = id => dispatch => {
  dispatch(setVenueLoading());
  dancerspotsAPI
    .get(`/venues/venueid/${id}`)
    .then(res =>
      dispatch({
        type: GET_VENUE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_VENUE,
        payload: {}
      })
    );
};

// Get user venues
export const getUserVenues = user_id => dispatch => {
  dispatch(setVenueLoading());
  dancerspotsAPI
    .get('/venues', user_id)
    .then(res =>
      dispatch({
        type: GET_USER_VENUES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USER_VENUES,
        payload: null
      })
    );
};

// Get all venues
export const getAllVenues = () => dispatch => {
  dispatch(setVenueLoading());
  dancerspotsAPI
    .get('/venues/all')
    .then(res =>
      dispatch({
        type: GET_VENUES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_VENUES,
        payload: null
      })
    );
};

// Favorite a venue
export const favoriteVenue = id => dispatch => {
  dancerspotsAPI
    .post(`/venues/favoritevenue/${id}`)
    .then(res =>
      dispatch({
        type: GET_VENUE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add a Review
export const addReview = (reviewData, venue_id) => dispatch => {
  dancerspotsAPI
    .post(`/venues/review/${venue_id}`, reviewData)
    .then(res =>
      dispatch({
        type: GET_VENUE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete a Review
export const deleteReview = (venue_id, review_id) => dispatch => {
  dancerspotsAPI
    .delete(`/venues/review/${venue_id}/${review_id}`)
    .then(res =>
      dispatch({
        type: GET_VENUE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const filterVenuesByName = (venues, name) => dispatch => {
  const regex = new RegExp(`^${name}`, 'gi');

  const filteredVenues = venues.filter(venue =>
    venue.name.toLowerCase().match(regex)
  );

  dispatch({
    type: FILTER_VENUES,
    payload: filteredVenues
  });
};

// Profile loading
export const setVenueLoading = () => {
  return {
    type: VENUE_LOADING
  };
};
