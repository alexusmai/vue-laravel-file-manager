/* eslint-disable no-param-reassign,no-restricted-syntax */
export default {
  /**
   * Clean the directories tree
   * @param state
   */
  cleanTree(state) {
    state.directories = [];
    state.counter = 1;
  },

  /**
   * Add directories to the tree
   * @param state
   * @param directories
   * @param parentId
   */
  addDirectories(state, { directories, parentId }) {
    directories.forEach((directory) => {
      // add properties to dir
      directory.id = state.counter;
      directory.parentId = parentId;
      directory.props.subdirectoriesLoaded = false;
      directory.props.showSubdirectories = false;

      state.counter += 1;

      state.directories.push(directory);
    });
  },

  /**
   * Replace directories
   * @param state
   * @param directories
   */
  replaceDirectories(state, directories) {
    state.directories = directories;
  },

  /**
   * Update directory properties
   * @param state
   * @param index
   * @param props
   */
  updateDirectoryProps(state, { index, props }) {
    for (const property in props) {
      if (Object.prototype.hasOwnProperty.call(props, property)) {
        state.directories[index].props[property] = props[property];
      }
    }
  },

  /**
   * Add to temp index array
   * @param state
   * @param index
   */
  addToTempArray(state, index) {
    state.tempIndexArray.push(index);
  },

  /**
   * Clear temp index array
   * @param state
   */
  clearTempArray(state) {
    state.tempIndexArray = [];
  },
};
