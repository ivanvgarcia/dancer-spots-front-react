import { dancerspotsAPI } from '../config/baseUrl';
import {
  GET_CURRENT_USER,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  FILTER_PROFILES
} from '../actions/types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  dancerspotsAPI
    .get('/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Get a profile by username
export const getProfile = username => dispatch => {
  dispatch(setProfileLoading());
  dancerspotsAPI
    .get(`/profile/username/${username}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Get a profile by id
export const getProfileByID = user_id => dispatch => {
  dispatch(setProfileLoading());
  dancerspotsAPI
    .get(`/profile/user/${user_id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Get all profiles
export const getAllProfiles = () => async dispatch => {
  dispatch(setProfileLoading());
  const res = await dancerspotsAPI.get('/profile/all');

  try {
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE,
      payload: {}
    });
  }
};

// Create profile
export const createProfile = (profileData, history) => dispatch => {
  dancerspotsAPI
    .post('/profile/', profileData)
    .then(res => history.push('/myprofile'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get current user
export const getCurrentUser = () => dispatch => {
  dancerspotsAPI
    .get(`/users/current`)
    .then(res =>
      dispatch({
        type: GET_CURRENT_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CURRENT_USER,
        payload: {}
      })
    );
};

// Add Dance Experience
export const addExperience = (expData, history) => dispatch => {
  dancerspotsAPI
    .post('/profile/danceexperience', expData)
    .then(res => history.push('/myprofile'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Create a comment
export const addComment = (commentData, id) => dispatch => {
  dancerspotsAPI
    .post(`/profile/comment/${id}`, commentData)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
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

// Delete a comment
export const deleteComment = (profile_id, comment_id) => dispatch => {
  dancerspotsAPI
    .delete(`/profile/comment/${profile_id}/${comment_id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
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

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// Delete Account and Profile
export const deleteAccount = () => dispatch => {
  if (
    window.confirm(
      'Are you sure you want to delete your account? This cannot be undone.'
    )
  ) {
    dancerspotsAPI.delete('/profile').then(res =>
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      }).catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
    );
  }
};

// Delete Experience
export const deleteExperience = id => dispatch => {
  if (
    window.confirm(
      'Are you sure you want to delete your experience? This cannot be undone.'
    )
  ) {
    dancerspotsAPI.delete(`/profile/danceexperience/${id}`).then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      }).catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
    );
  }
};

export const filterProfilesByName = (profiles, username) => dispatch => {
  const regex = new RegExp(`^${username}`, 'gi');

  const filteredProfiles = profiles.filter(profile =>
    profile.username.toLowerCase().match(regex)
  );

  dispatch({
    type: FILTER_PROFILES,
    payload: filteredProfiles
  });
};
