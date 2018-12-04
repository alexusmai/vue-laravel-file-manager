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

export default {
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
};
