// store modules
import tree from './modules/tree';
import modal from './modules/modal';
import settings from './modules/settings';
import manager from './modules/manager';
import messages from './modules/messages';
// main actions and getters
import state from './state';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';

const fm = {
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

export default fm;
