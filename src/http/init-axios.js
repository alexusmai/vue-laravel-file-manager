import axios from 'axios';

/**
 * Default headers
 */
function createHeaders() {
  // axios headers
  let headers = {};

  if (process.env.NODE_ENV === 'development') {
    headers = { 'X-Requested-With': 'XMLHttpRequest' };
  } else {
    // Laravel CSRF token
    const token = document.head.querySelector('meta[name="csrf-token"]');

    if (!token) {
      // eslint-disable-next-line
      console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
    }

    headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': token.content,
    };
  }

  return headers;
}

/**
 * Default base url
 * @returns {string}
 */
function createBaseUrl() {
  let baseUrl;

  if (process.env.NODE_ENV === 'development') {
    baseUrl = process.env.VUE_APP_AXIOS_BASE_URL;
  } else {
    baseUrl = `${window.location.protocol}//${window.location.hostname}`;

    if (window.location.port.length) {
      baseUrl += `:${window.location.port}/file-manager/`;
    } else {
      baseUrl += '/file-manager/';
    }
  }

  return baseUrl;
}

// set new axios instance
export default axios.create({
  baseURL: createBaseUrl(),
  headers: createHeaders(),
});
