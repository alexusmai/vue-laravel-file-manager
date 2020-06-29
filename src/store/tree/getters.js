export default {
  /**
   * Find directory index in the tree
   * @param state
   * @returns {function(*): (number | *)}
   */
  findDirectoryIndex: (state) => (path) => state.directories.findIndex((el) => el.path === path),

  /**
   * Filtered directories list
   * @param state
   * @param getters
   * @param rootState
   * @returns {*}
   */
  directories(state, getters, rootState) {
    if (rootState.fm.settings.hiddenFiles) {
      return state.directories;
    }

    return state.directories.filter((item) => item.basename.match(new RegExp('^([^.]).*', 'i')));
  },
};
