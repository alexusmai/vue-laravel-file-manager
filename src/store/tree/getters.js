export default {
  /**
   * Find directory index in the tree
   * @param state
   * @returns {function(*): (number | *)}
   */
  findDirectoryIndex: state => path => state.directories.findIndex(el => el.path === path),
};
