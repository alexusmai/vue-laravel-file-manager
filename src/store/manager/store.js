import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export default {
  namespaced: true,
  state() {
    return {
      // selected disk
      selectedDisk: null,

      // selected directory
      selectedDirectory: null,

      // Directories in the selected directory
      directories: [],

      // files in the selected directory
      files: [],

      // selected files and folders
      selected: {
        directories: [],
        files: [],
      },

      // sorting settings
      sort: {
        field: 'name',
        direction: 'up',
      },

      // history
      history: [null],

      // history pointer
      historyPointer: 0,

      // view type - table or grid - (default - table)
      viewType: 'table',
    };
  },
  mutations,
  getters,
  actions,
};
