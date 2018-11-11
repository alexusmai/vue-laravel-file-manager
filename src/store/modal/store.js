import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export default {
  namespaced: true,
  state() {
    return {
      // modal window
      showModal: false,

      // modal name
      modalName: null,

      // main modal block height
      modalBlockHeight: 0,
    };
  },
  mutations,
  getters,
  actions,
};
