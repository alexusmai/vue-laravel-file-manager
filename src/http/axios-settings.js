/* eslint-disable no-console */
import axios from 'axios';

// CSRF token
const token = document.head.querySelector('meta[name="csrf-token"]');

if (!token) {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

const HTTP = axios.create({
  baseURL: `${location.protocol}//${location.hostname}/file-manager/`,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': token.content,
  },
});

export default HTTP;
