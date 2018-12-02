/* eslint-disable no-param-reassign */
import store from './../store';
import HTTP from './init-axios';
import EventBus from './../eventBus';

/**
 * Add axios request interceptor
 */
function requestInterceptor() {
  HTTP.interceptors.request.use((config) => {
    // overwrite base url
    if (store.getters['fm/settings/baseUrl'] !== config.baseURL) {
      config.baseURL = store.getters['fm/settings/baseUrl'];
    }

    // overwrite headers
    const newHeaders = store.state.fm.settings.headers;

    if (newHeaders) {
      Object.keys(newHeaders)
        .forEach((key) => { config.headers[key] = newHeaders[key]; });
    }

    // loading spinner +
    store.commit('fm/messages/addLoading');

    return config;
  }, (error) => {
    // loading spinner -
    store.commit('fm/messages/subtractLoading');
    // Do something with request error
    return Promise.reject(error);
  });
}

/**
 * add axios response interceptor
 */
function responseInterceptor() {
  HTTP.interceptors.response.use((response) => {
    // loading spinner -
    store.commit('fm/messages/subtractLoading');

    // create notification, if find message text
    if (Object.prototype.hasOwnProperty.call(response.data, 'result')) {
      if (response.data.result.message) {
        // show notification
        EventBus.$emit('addNotification', response.data.result);

        // set action result
        store.commit('fm/messages/setActionResult', response.data.result);
      }
    }

    return response;
  }, (error) => {
    // loading spinner -
    store.commit('fm/messages/subtractLoading');

    // set error message
    store.commit('fm/messages/setError', error);

    const errorMessage = {
      status: 'error',
      message: '',
    };

    // add message
    if (error.response) {
      errorMessage.message = error.response.data.message || error.response.statusText;
    } else if (error.request) {
      errorMessage.message = error.request.statusText || 'Network error';
    } else {
      errorMessage.message = error.message;
    }

    // show notification
    EventBus.$emit('addNotification', errorMessage);

    return Promise.reject(error);
  });
}

export { requestInterceptor, responseInterceptor };
