import { dancerspotsAPI } from 'axios';

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    dancerspotsAPI.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete Auth header
    delete dancerspotsAPI.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
