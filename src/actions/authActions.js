import {
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_CURRENT_USER,
  EDIT_CURRENT_USER,
  RESET_PASSWORD,
  FORGOT_PASSWORD
} from './types';
import { dancerspotsAPI } from '../config/baseUrl';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Register User
export const registerUser = (userData, history) => dispatch => {
  dancerspotsAPI
    .post('/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get logged in users data
export const getCurrentUser = () => async dispatch => {
  const response = await dancerspotsAPI.get('/users/current');

  dispatch({
    type: GET_CURRENT_USER,
    payload: response.data
  });
};

// Edit logged in user
export const editCurrentUser = (userData, id, history) => async dispatch => {
  const response = await dancerspotsAPI.post(`/users/edit/${id}`, userData);

  try {
    dispatch({
      type: EDIT_CURRENT_USER,
      payload: response.data
    });
    history.push('/myprofile');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getResetPasswordToken = email => async dispatch => {
  dancerspotsAPI
    .post('/users/forgotpassword', email)
    .then(response => {
      dispatch({
        type: FORGOT_PASSWORD,
        payload: true
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const resetPassword = (userData, history) => async dispatch => {
  dancerspotsAPI
    .post('/users/resetpassword', userData)
    .then(response => {
      dispatch({
        type: RESET_PASSWORD,
        payload: false
      });

      history.push('/login');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  dancerspotsAPI
    .post('/users/login', userData)
    .then(res => {
      // Save to local storage
      const { token } = res.data;
      // Set token to local storage
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = history => async dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  await dispatch(setCurrentUser({}));
};
