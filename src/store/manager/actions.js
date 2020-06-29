/* eslint-disable object-curly-newline */
import GET from '../../http/get';

export default {
  /**
   * Load files and folders for the selected directory
   * @param state
   * @param commit
   * @param dispatch
   * @param rootState
   * @param path
   * @param history
   * @returns {Promise}
   */
  selectDirectory({ state, commit, dispatch, rootState }, { path, history }) {
    // reset content
    commit('setDirectoryContent', { directories: [], files: [] });

    // get content for the selected directory
    return GET.content(state.selectedDisk, path).then((response) => {
      if (response.data.result.status === 'success') {
        commit('resetSelected');
        commit('resetSortSettings');
        commit('setDirectoryContent', response.data);
        commit('setSelectedDirectory', path);

        if (history) commit('addToHistory', path);

        // if directories tree is shown, not main directory and directory have subdirectories
        if (
          rootState.fm.settings.windowsConfig === 2
          && path
          && response.data.directories.length
        ) {
          dispatch('fm/tree/showSubdirectories', path, { root: true });
        }
      }
    });
  },

  /**
   * Refresh content in the selected directory
   * @param state
   * @param commit
   * @param dispatch
   */
  refreshDirectory({ state, commit, dispatch }) {
    GET.content(state.selectedDisk, state.selectedDirectory).then((response) => {
      commit('resetSelected');
      commit('resetSortSettings');
      commit('resetHistory');

      // add to history selected directory
      if (state.selectedDirectory) commit('addToHistory', state.selectedDirectory);

      if (response.data.result.status === 'success') {
        commit('setDirectoryContent', response.data);
      } else if (response.data.result.status === 'danger') {
        // If directory not found try to load main directory
        commit('setSelectedDirectory', null);
        dispatch('refreshDirectory');
      }
    });
  },

  /**
   * History Back
   * @param state
   * @param commit
   * @param dispatch
   */
  historyBack({ state, commit, dispatch }) {
    dispatch('selectDirectory', {
      path: state.history[state.historyPointer - 1],
      history: false,
    });
    commit('pointerBack');
  },

  /**
   * History Forward
   * @param state
   * @param commit
   * @param dispatch
   */
  historyForward({ state, commit, dispatch }) {
    dispatch('selectDirectory', {
      path: state.history[state.historyPointer + 1],
      history: false,
    });
    commit('pointerForward');
  },

  /**
   * Sort data by field
   * @param context
   * @param field
   * @param direction
   */
  sortBy({ state, commit }, { field, direction }) {
    if (state.sort.field === field && !direction) {
      commit('setSortDirection', state.sort.direction === 'up' ? 'down' : 'up');
    } else if (direction) {
      commit('setSortDirection', direction);
      commit('setSortField', field);
    } else {
      commit('setSortDirection', 'up');
      commit('setSortField', field);
    }
    // sort by field type
    switch (field) {
      case 'name':
        commit('sortByName');
        break;
      case 'size':
        commit('sortBySize');
        break;
      case 'type':
        commit('sortByType');
        break;
      case 'date':
        commit('sortByDate');
        break;
      default:
        break;
    }
  },
};
