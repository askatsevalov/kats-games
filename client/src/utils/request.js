import axios from 'axios';

export const baseURL = (() => {
  if (process.env.NODE_ENV === 'development') {
    const host = process.env.VUE_APP_API_HOST || 'localhost';
    const port = process.env.VUE_APP_API_PORT || '5000';
    return `http://${host}:${port}`;
  }
  return '';
})();

// create an axios instance
const service = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // if (error.response.status >= 500) {
    // }

    return Promise.reject(error);
  },
);

export default service;
