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
  },

  /**
   * Initiate base url
   * @param state
   */
  initBaseUrl(state) {
    if (!state.baseUrl) {
      if (process.env.NODE_ENV === 'development') {
        state.baseUrl = process.env.VUE_APP_AXIOS_BASE_URL;
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
  },

  /**
   * Initialize App settings from server
   * @param state
   * @param data
   */
  initSettings(state, data) {
    if (!state.lang) state.lang = data.lang;
    if (!state.windowsConfig) state.windowsConfig = data.windowsConfig;
  },
};
