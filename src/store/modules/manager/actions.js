import GET from '../../../http/get-queries';

export default {
  /**
   * Load files and folders in to the selected directory
   * @param context
   * @param path
   * @param history
   */
  selectDirectory(context, { path, history }) {
    // get content from the server
    return GET.content(
      context.state.selectedDisk,
      path,
    ).then((response) => {
      // if the action was successful
      if (response.data.result.status === 'success') {
        // clean selected items
        context.commit('resetSelected');

        // reset sorting
        context.commit('resetSortSettings');

        // set content
        context.commit('setDirectoryContent', response.data);

        // set new selected directory
        context.commit('setSelectedDirectory', path);

        // add to history, if need
        if (history) context.commit('addToHistory', path);

        // if directories tree is shown, not main directory and directory have subdirectories
        if (
          context.rootState.fm.settings.windowsConfig === 2
          && path
          && response.data.directories.length
        ) {
          // show subdirectories in a tree
          context.dispatch('fm/tree/showSubdirectories', path, { root: true });
        }
      }
    });
  },

  /**
   * Refresh content in the selected directory
   * @param context
   */
  refreshDirectory(context) {
    // get content from the server
    GET.content(
      context.state.selectedDisk,
      context.state.selectedDirectory,
    ).then((response) => {
      // clean selected items
      context.commit('resetSelected');

      // reset sorting
      context.commit('resetSortSettings');

      // reset history
      context.commit('resetHistory');
      // add to history selected directory
      if (context.state.selectedDirectory) context.commit('addToHistory', context.state.selectedDirectory);

      if (response.data.result.status === 'success') {
        // refresh content
        context.commit('setDirectoryContent', response.data);
      } else if (response.data.result.status === 'danger') {
        // If directory not found
        context.commit('setSelectedDirectory', null);
        // try to load main directory
        context.dispatch('refreshDirectory');
      }
    });
  },

  /**
   * History Back
   * @param context
   */
  historyBack(context) {
    context.dispatch('selectDirectory', {
      path: context.state.history[context.state.historyPointer - 1],
      history: false });
    context.commit('pointerBack');
  },

  /**
   * History Forward
   * @param context
   */
  historyForward(context) {
    context.dispatch('selectDirectory', {
      path: context.state.history[context.state.historyPointer + 1],
      history: false });
    context.commit('pointerForward');
  },

  /**
   * Sort data by field
   * @param context
   * @param field
   * @param direction
   */
  sortBy(context, { field, direction }) {
    if (context.state.sort.field === field && !direction) {
      context.commit('setSortDirection', context.state.sort.direction === 'up' ? 'down' : 'up');
    } else if (direction) {
      // set default direction
      context.commit('setSortDirection', direction);
      // set field name
      context.commit('setSortField', field);
    } else {
      // set default direction
      context.commit('setSortDirection', 'up');
      // set field name
      context.commit('setSortField', field);
    }
    // sort by field type
    switch (field) {
      case 'name':
        context.commit('sortByName');
        break;
      case 'size':
        context.commit('sortBySize');
        break;
      case 'type':
        context.commit('sortByType');
        break;
      case 'date':
        context.commit('sortByDate');
        break;
      default:
        break;
    }
  },
};
