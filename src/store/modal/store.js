import mutations from './mutations';

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
};
