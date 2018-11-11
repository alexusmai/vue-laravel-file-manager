/**
 * API URL
 * @returns {string}
 */
function apiURL() {
  return process.env.NODE_ENV !== 'production' ?
    'http://lfm.loc/file-manager/' :
    `${window.location.protocol}//${window.location.hostname}/file-manager/`;
}

/**
 * Headers
 * @returns {*}
 */
function headers() {
  if (process.env.NODE_ENV !== 'production') {
    return {
      'X-Requested-With': 'XMLHttpRequest',
    };
  }

  // Laravel CSRF token
  const token = document.head.querySelector('meta[name="csrf-token"]');

  if (!token) {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
  }

  return {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': token.content,
  };
}

export { apiURL, headers };
