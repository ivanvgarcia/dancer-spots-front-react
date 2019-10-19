import axios from 'axios';
import {
  GET_EVENT,
  GET_EVENTS,
  EVENT_LOADING,
  GET_ERRORS
} from '../actions/types';

// Add an event
export const addEvent = (eventData, history) => dispatch => {
  axios
    .post('/api/events', eventData)
    .then(res => history.push(`/event/${res.data._id}`))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete an event
export const deleteEvent = id => dispatch => {
  if (
    window.confirm(
      'Are you sure you want to delete this event? This cannot be undone.'
    )
  ) {
    axios
      .delete(`/api/events/eventid/${id}`)
      .then(res =>
        dispatch({
          type: GET_EVENTS,
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

// Get current event
export const getCurrentEvent = id => dispatch => {
  dispatch(setEventLoading());
  axios
    .get(`/api/events/event_id/${id}`)
    .then(res =>
      dispatch({
        type: GET_EVENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EVENT,
        payload: {}
      })
    );
};

// Get all events
export const getAllEvents = () => async dispatch => {
  dispatch(setEventLoading());
  const res = await axios.get('/api/events/all');
  try {
    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_EVENTS,
      payload: null
    });
  }
};

// Profile loading
export const setEventLoading = () => {
  return {
    type: EVENT_LOADING
  };
};
