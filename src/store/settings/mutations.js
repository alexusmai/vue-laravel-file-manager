export default {
  /**
   * Set windows config
   * @param state
   * @param data
   */
  manualSettings(state, data) {
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
      state.translations[data.translation.name] = Object.freeze(data.translation.content);
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
