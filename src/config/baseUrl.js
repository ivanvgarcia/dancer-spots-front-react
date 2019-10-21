import axios from 'axios';
const dev = process.env.NODE_ENV === 'development' && true;

let baseURL;

if (dev) {
  baseURL = 'http://localhost:5000/api';
} else {
  baseURL = 'https://www.dancerspots-api.com/api';
}

export const dancerspotsAPI = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});
