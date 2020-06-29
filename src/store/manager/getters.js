export default {
  /**
   * Files list(filtered)
   * @param state
   * @param getters
   * @param rootState
   */
  files(state, getters, rootState) {
    if (rootState.fm.settings.hiddenFiles) {
      return state.files;
    }

    return state.files.filter((item) => item.basename.match(new RegExp('^([^.]).*', 'i')));
  },

  /**
   * Directories list(filtered)
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

  /**
   * Files counter
   * @param state
   * @param getters
   * @returns {*}
   */
  filesCount(state, getters) {
    return getters.files.length;
  },

  /**
   * Directories counter
   * @param state
   * @param getters
   * @returns {*}
   */
  directoriesCount(state, getters) {
    return getters.directories.length;
  },

  /**
   * Files size - bytes
   * @param state
   * @param getters
   * @returns {*}
   */
  filesSize(state, getters) {
    if (getters.files.length) {
      return getters.files.reduce((previous, current) => previous + Number(current.size), 0);
    }

    return 0;
  },

  /**
   * Count selected files and folders
   * @param state
   * @param getters
   * @returns {number}
   */
  selectedCount(state, getters) {
    return getters.selectedList.length;
  },

  /**
   * Selected files size
   * @param state
   * @returns {number}
   */
  selectedFilesSize(state) {
    const selectedFiles = state.files.filter((file) => state.selected.files.includes(file.path));

    if (selectedFiles.length) {
      return selectedFiles.reduce((previous, current) => previous + Number(current.size), 0);
    }

    return 0;
  },

  /**
   * Selected files and folders
   * @param state
   */
  selectedList(state) {
    const selectedDirectories = state.directories.filter((directory) => state.selected.directories.includes(directory.path));

    const selectedFiles = state.files.filter((file) => state.selected.files.includes(file.path));

    return selectedDirectories.concat(selectedFiles);
  },

  /**
   * Breadcrumb
   * @param state
   * @returns {*}
   */
  breadcrumb(state) {
    if (state.selectedDirectory) {
      return state.selectedDirectory.split('/');
    }

    return null;
  },

  /**
   * Compare directories name
   * @param state
   */
  directoryExist: (state) => (basename) => state.directories.some((el) => el.basename === basename),

  /**
   * Compare files name
   * @param state
   */
  fileExist: (state) => (basename) => state.files.some((el) => el.basename === basename),
};
