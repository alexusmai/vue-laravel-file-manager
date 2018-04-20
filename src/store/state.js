export default {
  /**
   * Active manager
   * left or right
   * default: left
   */
  activeManager: 'left',

  /**
   * Clipboard
   * Type - copy || cut
   */
  clipboard: {
    type: null,
    disk: null,
    directories: [],
    files: [],
  },

  // disk list
  diskList: [],

  // file callback for ckeditor, ...
  fileCallback: null,
};
