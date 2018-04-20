/* eslint-disable no-console */
import fm from './store/file-manager';
import FileManager from './FileManager';

function install(Vue, options = {}) {
  if (!options.store) console.error('Please provide a store!!');

  Vue.component('file-manager', FileManager);

  options.store.registerModule('fm', fm);
}

export default {
  install,
};
