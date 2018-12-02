export default {
  /**
   * Files count
   * @param state
   * @returns {number}
   */
  filesCount(state) {
    return state.files.length;
  },

  /**
   * Directories count
   * @param state
   * @returns {number}
   */
  directoriesCount(state) {
    return state.directories.length;
  },

  /**
   * Files size - bytes
   * @param state
   * @returns {*}
   */
  filesSize(state) {
    if (state.files.length) {
      return state.files.reduce((previous, current) => previous + current.size, 0);
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
    const selectedFiles = state.files.filter(file => state.selected.files.includes(file.path));

    if (selectedFiles.length) {
      return selectedFiles.reduce((previous, current) => previous + current.size, 0);
    }

    return 0;
  },

  /**
   * Selected files and folders
   * @param state
   */
  selectedList(state) {
    const selectedDirectories = state.directories.filter(directory => state.selected.directories.includes(directory.path));

    const selectedFiles = state.files.filter(file => state.selected.files.includes(file.path));

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
  directoryExist: state => basename => state.directories.some(el => el.basename === basename),

  /**
   * Compare files name
   * @param state
   */
  fileExist: state => basename => state.files.some(el => el.basename === basename),
};
