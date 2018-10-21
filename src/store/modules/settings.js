import ru from '../../lang/ru';
import en from '../../lang/en';
import ar from '../../lang/ar';

const settings = {
  namespaced: true,
  state: {
    /**
     * file manager windows configuration
     * 1 - only one file manager window
     * 2 - one file manager window with directories tree module
     * 3 - two file manager windows
     */
    windowsConfig: null,

    // app language
    lang: null,

    // translations (/src/lang)
    translations: {
      ru: Object.freeze(ru),
      en: Object.freeze(en),
      ar: Object.freeze(ar),
    },

    // full screen mode
    fullScreen: false,
  },
  mutations: {
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

    // screen mode toggle - ON/OFF full screen
    screenToggle(state) {
      state.fullScreen = !state.fullScreen;
    },

  },
};

export default settings;
