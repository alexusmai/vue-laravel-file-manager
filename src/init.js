import store from './store';
import FileManager from './FileManager.vue';

function install(Vue, options = {}) {
  if (!options.store) console.error('Please provide a store!!');

  Vue.component('file-manager', FileManager);

  options.store.registerModule('fm', store);

  if (Object.prototype.hasOwnProperty.call(options, 'config')) {
    options.store.commit('fm/settings/manualSettings', options.config);
  }
}

export default {
  install,
};
