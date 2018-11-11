import Vue from 'vue';
import Vuex from 'vuex';
// store modules
import tree from './store/tree/store';
import modal from './store/modal/store';
import settings from './store/settings/store';
import manager from './store/manager/store';
import messages from './store/messages/store';
// main store
import state from './store/state';
import mutations from './store/mutations';
import getters from './store/getters';
import actions from './store/actions';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    fm: {
      namespaced: true,
      modules: {
        settings,
        left: manager,
        right: manager,
        tree,
        modal,
        messages,
      },
      state,
      mutations,
      actions,
      getters,
    },
  },
});
