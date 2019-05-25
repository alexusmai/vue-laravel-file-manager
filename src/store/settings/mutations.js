import Vue from 'vue';

export default {
  /**
   * Set config
   * @param state
   * @param data
   */
  manualSettings(state, data) {
    // overwrite headers - Axios
    if (Object.prototype.hasOwnProperty.call(data, 'headers')) {
      state.headers = data.headers;
    }
    // base url - axios
    if (Object.prototype.hasOwnProperty.call(data, 'baseUrl')) {
      state.baseUrl = data.baseUrl;
    }
    // windows config
    if (Object.prototype.hasOwnProperty.call(data, 'windowsConfig')) {
      state.windowsConfig = data.windowsConfig;
    }
    // language
    if (Object.prototype.hasOwnProperty.call(data, 'lang')) {
      state.lang = data.lang;
    }
    // add new translation
    if (Object.prototype.hasOwnProperty.call(data, 'translation')) {
      Vue.set(state.translations, data.translation.name, Object.freeze(data.translation.content));
    }
    // extra configurations
    if (Object.prototype.hasOwnProperty.call(data, 'extConfig')) {
      state.ext_config = data.ext_config;
    }
  },

  /**
   * Initiate Axios baseUrl and headers
   * @param state
   */
  initAxiosSettings(state) {
    // initiate base url, if not set manually
    if (!state.baseUrl) {
      if (process.env.VUE_APP_LFM_AXIOS_BASE_URL) {
        // vue .env
        state.baseUrl = process.env.VUE_APP_LFM_AXIOS_BASE_URL;
      } else if (process.env.MIX_LFM_BASE_URL) {
        // laravel .env
        state.baseUrl = process.env.MIX_LFM_BASE_URL;
      } else {
        let baseUrl = `${window.location.protocol}//${window.location.hostname}`;

        if (window.location.port.length) {
          baseUrl += `:${window.location.port}/file-manager/`;
        } else {
          baseUrl += '/file-manager/';
        }

        state.baseUrl = baseUrl;
      }
    }

    // initiate headers, if not set manually
    if (!state.headers) {
      // off laravel csrf-token if need
      if (process.env.VUE_APP_LFM_CSRF_TOKEN === 'OFF' ||
          process.env.MIX_LFM_CSRF_TOKEN === 'OFF'
      ) {
        state.headers = { 'X-Requested-With': 'XMLHttpRequest' };
      } else {
        // Laravel CSRF token
        const token = document.head.querySelector('meta[name="csrf-token"]');

        if (!token) {
          // eslint-disable-next-line
          console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
        }

        state.headers = {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': token.content,
        };
      }
    }
  },

  /**
   * Initialize App settings from server
   * @param state
   * @param data
   */
  initSettings(state, data) {
    if (!state.lang) state.lang = data.lang;
    if (!state.windowsConfig) state.windowsConfig = data.windowsConfig;
    state.acl = data.acl;
  },
};
