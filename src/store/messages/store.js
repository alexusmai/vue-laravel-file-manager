import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export default {
  namespaced: true,
  state() {
    return {
      // last action result
      actionResult: {
        status: null,
        message: null,
      },

      // completing state
      actionProgress: 0,

      // loading spinner
      loading: 0,

      // application error messages
      errors: [],
    };
  },
  mutations,
  getters,
  actions,
};
