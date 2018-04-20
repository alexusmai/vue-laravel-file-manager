import mutations from './manager/mutations';
import getters from './manager/getters';
import actions from './manager/actions';

const manager = {
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

export default manager;
