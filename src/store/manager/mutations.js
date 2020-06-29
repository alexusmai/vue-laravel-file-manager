export default {
  /**
   * Set selected disk
   * @param state
   * @param disk
   */
  setDisk(state, disk) {
    state.selectedDisk = disk;
  },

  /**
   * Set directories and files in selected directory
   * @param state
   * @param data
   */
  setDirectoryContent(state, data) {
    state.directories = data.directories;
    state.files = data.files;
  },

  /**
   * Set selected directory
   * @param state
   * @param directory
   */
  setSelectedDirectory(state, directory) {
    state.selectedDirectory = directory;
  },

  /**
   * Set selected items
   * @param state
   * @param type (directories, files)
   * @param path
   */
  setSelected(state, { type, path }) {
    state.selected[type].push(path);
  },

  /**
   * Remove item from array
   * @param state
   * @param arrayIndex
   */
  removeSelected(state, { type, path }) {
    const itemIndex = state.selected[type].indexOf(path);
    if (itemIndex !== -1) state.selected[type].splice(itemIndex, 1);
  },

  /**
   * Change selected item
   * @param state
   * @param type
   * @param path
   */
  changeSelected(state, { type, path }) {
    state.selected.directories = [];
    state.selected.files = [];
    state.selected[type].push(path);
  },

  /**
   * Reset selected items array
   * @param state
   */
  resetSelected(state) {
    state.selected.directories = [];
    state.selected.files = [];
  },

  /**
   * Add new file
   * @param state
   * @param newFile
   */
  addNewFile(state, newFile) {
    state.files.push(newFile);
  },

  /**
   * Update file
   * @param state
   * @param file
   */
  updateFile(state, file) {
    const itemIndex = state.files.findIndex((el) => el.basename === file.basename);
    if (itemIndex !== -1) state.files[itemIndex] = file;
  },

  /**
   * Add new directory
   * @param state
   * @param newDirectory
   */
  addNewDirectory(state, newDirectory) {
    state.directories.push(newDirectory);
  },

  /**
   * Change history pointer (back)
   * @param state
   */
  pointerBack(state) {
    state.historyPointer -= 1;
  },

  /**
   * Change history pointer (forward)
   * @param state
   */
  pointerForward(state) {
    state.historyPointer += 1;
  },

  /**
   * Add to history
   * @param state
   * @param path
   */
  addToHistory(state, path) {
    if (state.historyPointer < state.history.length - 1) {
      // erase next elements in the history
      state.history.splice(state.historyPointer + 1, Number.MAX_VALUE);
    }
    // add new path
    state.history.push(path);
    // change history pointer
    state.historyPointer += 1;
  },

  /**
   * Reset history
   * @param state
   */
  resetHistory(state) {
    state.history = [null];
    state.historyPointer = 0;
  },

  /**
   * Set view type
   * Grid or Table
   * @param state
   * @param type
   */
  setView(state, type) {
    state.viewType = type;
  },

  /**
   * Set sort settings - field name
   * @param state
   * @param field
   */
  setSortField(state, field) {
    state.sort.field = field;
  },

  /**
   * Set sort settings - direction
   * @param state
   * @param direction
   */
  setSortDirection(state, direction) {
    state.sort.direction = direction;
  },

  /**
   * Reset sort settings
   * @param state
   */
  resetSortSettings(state) {
    state.sort.field = 'name';
    state.sort.direction = 'up';
  },

  /**
   * Sort table by name field
   * @param state
   */
  sortByName(state) {
    if (state.sort.direction === 'up') {
      state.directories.sort((a, b) => a.basename.localeCompare(b.basename));
      state.files.sort((a, b) => a.basename.localeCompare(b.basename));
    } else {
      state.directories.sort((a, b) => b.basename.localeCompare(a.basename));
      state.files.sort((a, b) => b.basename.localeCompare(a.basename));
    }
  },

  /**
   * Sort by file size
   * @param state
   */
  sortBySize(state) {
    state.directories.sort((a, b) => a.basename.localeCompare(b.basename));

    if (state.sort.direction === 'up') {
      state.files.sort((a, b) => a.size - b.size);
    } else {
      state.files.sort((a, b) => b.size - a.size);
    }
  },

  /**
   * Sort by file extension
   * @param state
   */
  sortByType(state) {
    state.directories.sort((a, b) => a.basename.localeCompare(b.basename));

    if (state.sort.direction === 'up') {
      state.files.sort((a, b) => a.extension.localeCompare(b.extension));
    } else {
      state.files.sort((a, b) => b.extension.localeCompare(a.extension));
    }
  },

  /**
   * Sort by date
   * @param state
   */
  sortByDate(state) {
    if (state.sort.direction === 'up') {
      state.directories.sort((a, b) => a.timestamp - b.timestamp);
      state.files.sort((a, b) => a.timestamp - b.timestamp);
    } else {
      state.directories.sort((a, b) => b.timestamp - a.timestamp);
      state.files.sort((a, b) => b.timestamp - a.timestamp);
    }
  },
};
