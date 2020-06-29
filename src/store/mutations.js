/* eslint-disable object-curly-newline */
export default {
  /**
   * Set disks
   * @param state
   * @param disks
   */
  setDisks(state, disks) {
    state.disks = disks;
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

  /**
   * Screen mode toggle - ON/OFF full screen
   * @param state
   */
  screenToggle(state) {
    state.fullScreen = !state.fullScreen;
  },

  /**
   * Reset state
   * @param state
   */
  resetState(state) {
    state.activeManager = 'left';
    state.clipboard = {
      type: null,
      disk: null,
      directories: [],
      files: [],
    };
    state.disks = [];
    state.fileCallback = null;
    state.fullScreen = false;
  },
};
