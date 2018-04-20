/* eslint-disable no-new,import/prefer-default-export */
import Vue from 'vue';
import Vuex from 'vuex';

// main store module
import fm from './store/file-manager';

// main component
import FileManager from './FileManager';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { fm },
});

Vue.config.productionTip = false;

window.fm = new Vue({
  el: '#fm',
  store,
  components: { FileManager },
  template: '<FileManager/>',
});
