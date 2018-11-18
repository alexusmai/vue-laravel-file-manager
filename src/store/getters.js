export default {
  /**
   * Get a list of disks
   * @param state
   * @returns {string[]}
   */
  diskList(state) {
    return Object.keys(state.disks);
  },

  /**
   * Selected disk for active manager
   * @param state
   * @returns {selectedDisk|null|*|computed.selectedDisk}
   */
  selectedDisk(state) {
    return state[state.activeManager].selectedDisk;
  },

  /**
   * Selected directory for active manager
   * @param state
   * @returns {selectedDirectory|computed.selectedDirectory|string|*}
   */
  selectedDirectory(state) {
    return state[state.activeManager].selectedDirectory;
  },

  /**
   * List of selected files and folders for the active manager
   * @param state
   * @param getters
   * @returns {*}
   */
  selectedItems(state, getters) {
    return getters[`${state.activeManager}/selectedList`];
  },

  /**
   * Inactive manager name
   * @param state
   * @returns {string}
   */
  inactiveManager(state) {
    return state.activeManager === 'left' ? 'right' : 'left';
  },
};
