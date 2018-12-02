import store from './store';
import FileManager from './FileManager.vue';

/**
 * Install
 *
 * options = {
 *   store, // required
 *
 *   // not required params
 *   headers: {'Authorization': 'Bearer ...'}, // add header
 * OR
 *   headers: {'X-CSRF-TOKEN': 'token'}, // overwrite default header Axios
 *   baseUrl: 'http://my_url:80/file-manager/', // overwrite base url Axios
 *   windowsConfig: 2, // overwrite config
 *   lang: 'de',
 *   translation: {
 *     name: de,
 *     content: {
 *       about: 'Über',
 *       back: 'Zurück',
 *       ... see lang file structure
 *     },
 *   },
 * }
 *
 * @param Vue
 * @param options
 */
export default function install(Vue, options = {}) {
  if (!options.store) console.error('Please provide a store!!');

  Vue.component('file-manager', FileManager);

  options.store.registerModule('fm', store);

  options.store.commit('fm/settings/manualSettings', options);
}
