export default {
  /**
   * Set disk list
   * @param state
   * @param list
   */
  setDiskList(state, list) {
    state.diskList = list;
  },

  /**
   * Set clipboard
   * @param state
   * @param type
   * @param disk
   * @param directories
   * @param files
   */
  setClipboard(state, { type, disk, directories, files }) {
    state.clipboard.type = type;
    state.clipboard.disk = disk;
    state.clipboard.directories = directories;
    state.clipboard.files = files;
  },

  /**
   * Truncate clipboard
   * @param state
   * @param type
   * @param path
   */
  truncateClipboard(state, { type, path }) {
    const itemIndex = state.clipboard[type].indexOf(path);
    if (itemIndex !== -1) state.clipboard[type].splice(itemIndex, 1);
    if (!state.clipboard.directories.length && !state.clipboard.files.length) {
      state.clipboard.type = null;
    }
  },

  /**
   * Reset clipboard
   * @param state
   */
  resetClipboard(state) {
    state.clipboard.type = null;
    state.clipboard.disk = null;
    state.clipboard.directories = [];
    state.clipboard.files = [];
  },

  /**
   * Select manager (when shown 2 file manager windows)
   * @param state
   * @param managerName
   */
  setActiveManager(state, managerName) {
    state.activeManager = managerName;
  },

  /**
   * Set file callback
   * @param state
   * @param callback
   */
  setFileCallBack(state, callback) {
    state.fileCallback = callback;
  },
};
