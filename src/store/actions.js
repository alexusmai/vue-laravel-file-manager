/* eslint-disable max-len,prefer-destructuring,object-curly-newline */
import GET from '../http/get';
import POST from '../http/post';

export default {
  /**
   * Get initiation data from server
   * @param state
   * @param commit
   * @param getters
   * @param dispatch
   */
  initializeApp({ state, commit, getters, dispatch }) {
    GET.initialize().then((response) => {
      if (response.data.result.status === 'success') {
        // set app settings
        commit('settings/initSettings', response.data.config);

        // set disks
        commit('setDisks', response.data.config.disks);

        const leftDisk = response.data.config.leftDisk
          ? response.data.config.leftDisk
          : getters.diskList[0];

        const rightDisk = response.data.config.rightDisk
          ? response.data.config.rightDisk
          : getters.diskList[0];

        // left manager - set default disk
        commit('left/setDisk', leftDisk);

        // load content to the left file manager
        dispatch('getLoadContent', {
          manager: 'left',
          disk: leftDisk,
          path: null,
        });

        // initialize the app depending on the settings
        if (state.settings.windowsConfig === 3) {
          // if selected left and right managers
          commit('right/setDisk', rightDisk);

          // load content to the right file manager
          dispatch('getLoadContent', {
            manager: 'right',
            disk: rightDisk,
            path: null,
          });
        } else if (state.settings.windowsConfig === 2) {
          // if selected left manager and directories tree
          // init directories tree
          dispatch('tree/initTree', leftDisk);
        }
      }
    });
  },

  /**
   * Download files and folders to the selected file manager
   * @param context
   * @param manager
   * @param disk
   * @param path
   */
  getLoadContent(context, { manager, disk, path }) {
    GET.content(disk, path).then((response) => {
      if (response.data.result.status === 'success') {
        context.commit(`${manager}/setDirectoryContent`, response.data);
      }
    });
  },

  /**
   * Select disk
   * @param state
   * @param commit
   * @param dispatch
   * @param disk
   * @param manager
   */
  selectDisk({ state, commit, dispatch }, { disk, manager }) {
    GET.selectDisk(disk).then((response) => {
      // if disk exist => change disk
      if (response.data.result.status === 'success') {
        // set disk name
        commit(`${manager}/setDisk`, disk);

        // reset history
        commit(`${manager}/resetHistory`);

        // reinitialize tree if directories tree is shown
        if (state.settings.windowsConfig === 2) {
          dispatch('tree/initTree', disk);
        }

        // download content for root path
        dispatch(`${manager}/selectDirectory`, { path: null, history: false });
      }
    });
  },

  /**
   * Create new file
   * @param getters
   * @param dispatch
   * @param fileName
   * @returns {Promise}
   */
  createFile({ getters, dispatch }, fileName) {
    // directory for new file
    const selectedDirectory = getters.selectedDirectory;

    // create new file, server side
    return POST.createFile(getters.selectedDisk, selectedDirectory, fileName).then((response) => {
      // update file list
      dispatch('updateContent', {
        response,
        oldDir: selectedDirectory,
        commitName: 'addNewFile',
        type: 'file',
      });

      return response;
    });
  },

  /**
   * Get file content
   * @param context
   * @param disk
   * @param path
   * @returns {*}
   */
  getFile(context, { disk, path }) {
    return GET.getFile(disk, path);
  },

  /**
   * Update file
   * @param getters
   * @param dispatch
   * @param formData
   * @returns {PromiseLike | Promise}
   */
  updateFile({ getters, dispatch }, formData) {
    // directory for updated file
    const selectedDirectory = getters.selectedDirectory;

    return POST.updateFile(formData).then((response) => {
      // update file list
      dispatch('updateContent', {
        response,
        oldDir: selectedDirectory,
        commitName: 'updateFile',
        type: 'file',
      });

      return response;
    });
  },

  /**
   * Create new directory
   * @param state
   * @param dispatch
   * @param folderName
   * @returns {Promise}
   */
  createDirectory({ getters, dispatch }, folderName) {
    // directory for new folder
    const selectedDirectory = getters.selectedDirectory;

    // create new directory, server side
    return POST.createDirectory(getters.selectedDisk, selectedDirectory, folderName).then((response) => {
      // update file list
      dispatch('updateContent', {
        response,
        oldDir: selectedDirectory,
        commitName: 'addNewDirectory',
        type: 'directory',
      });

      return response;
    });
  },

  /**
   * Upload file or files
   * @param getters
   * @param commit
   * @param dispatch
   * @param files
   * @param overwrite
   * @returns {Promise}
   */
  upload({ getters, commit, dispatch }, { files, overwrite }) {
    // directory where files will be uploaded
    const selectedDirectory = getters.selectedDirectory;

    // create new form data
    const data = new FormData();
    data.append('disk', getters.selectedDisk);
    data.append('path', selectedDirectory || '');
    data.append('overwrite', overwrite);
    // add file or files
    for (let i = 0; i < files.length; i += 1) {
      data.append('files[]', files[i]);
    }

    // axios config - progress bar
    const config = {
      onUploadProgress(progressEvent) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        commit('messages/setProgress', progress);
      },
    };

    // upload files
    return POST.upload(data, config).then((response) => {
      // clear progress
      commit('messages/clearProgress');

      // if files uploaded successfully
      if (
        response.data.result.status === 'success'
        && selectedDirectory === getters.selectedDirectory
      ) {
        // refresh content
        dispatch('refreshManagers');
      }

      return response;
    }).catch(() => {
      // clear progress
      commit('messages/clearProgress');
    });
  },

  /**
   * Delete selected files and folders
   * @param state
   * @param getters
   * @param dispatch
   * @param items
   * @returns {Promise}
   */
  delete({ state, getters, dispatch }, items) {
    return POST.delete(getters.selectedDisk, items).then((response) => {
      // if all items deleted successfully
      if (response.data.result.status === 'success') {
        // refresh content
        dispatch('refreshManagers');

        // delete directories from tree
        if (state.settings.windowsConfig === 2) {
          const onlyDir = items.filter(item => item.type === 'dir');
          dispatch('tree/deleteFromTree', onlyDir);
        }
      }

      return response;
    });
  },

  /**
   * Add selected items to clipboard
   * @param state
   * @param commit
   * @param getters
   * @param type
   */
  toClipboard({ state, commit, getters }, type) {
    // if files are selected
    if (getters[`${state.activeManager}/selectedCount`]) {
      commit('setClipboard', {
        type,
        disk: state[state.activeManager].selectedDisk,
        directories: state[state.activeManager].selected.directories.map(item => item),
        files: state[state.activeManager].selected.files.map(item => item),
      });
    }
  },

  /**
   * Paste files and folders
   * @param state
   * @param commit
   * @param getters
   * @param dispatch
   */
  paste({ state, commit, getters, dispatch }) {
    // copy/cut to this folder
    const selectedDirectory = getters.selectedDirectory;

    POST.paste(
      getters.selectedDisk,
      selectedDirectory,
      state.clipboard,
    ).then((response) => {
      // if the action was successful
      if (response.data.result.status === 'success') {
        // refresh content
        dispatch('refreshAll');

        // if action - cut - clear clipboard
        if (state.clipboard.type === 'cut') {
          commit('resetClipboard');
        }
      }
    });
  },

  /**
   * Rename file or folder
   * @param getters
   * @param dispatch
   * @param type
   * @param newName
   * @param oldName
   * @returns {Promise}
   */
  rename({ getters, dispatch }, { type, newName, oldName }) {
    return POST.rename(getters.selectedDisk, newName, oldName).then((response) => {
      // refresh content
      if (type === 'dir') {
        dispatch('refreshAll');
      } else {
        dispatch('refreshManagers');
      }

      return response;
    });
  },

  /**
   * Get file url
   * @param state
   * @param disk
   * @param path
   */
  url({ state }, { disk, path }) {
    GET.url(disk, path).then((response) => {
      if (response.data.result.status === 'success') {
        state.fileCallback(response.data.url);
      }
    });
  },

  /**
   * Zip files and folders
   * @param state
   * @param getters
   * @param dispatch
   * @param name
   * @returns {*|PromiseLike<T | never>|Promise<T | never>}
   */
  zip({ state, getters, dispatch }, name) {
    const selectedDirectory = getters.selectedDirectory;

    // create new form data
    const data = new FormData();
    data.append('disk', getters.selectedDisk);
    data.append('path', selectedDirectory || '');
    data.append('name', name);
    data.append('elements', JSON.stringify(state[state.activeManager].selected));

    return POST.zip(data).then((response) => {
      // if zipped successfully
      if (response.data.result.status === 'success'
          && selectedDirectory === getters.selectedDirectory
      ) {
        // refresh content
        dispatch('refreshManagers');
      }

      return response;
    });
  },

  /**
   * Unzip selected archive
   * @param getters
   * @param dispatch
   * @param folder
   * @returns {*|PromiseLike<T | never>|Promise<T | never>}
   */
  unzip({ getters, dispatch }, folder) {
    const selectedDirectory = getters.selectedDirectory;

    return POST.unzip({
      disk: getters.selectedDisk,
      path: getters.selectedItems[0].path,
      folder,
    }).then((response) => {
      // if zipped successfully
      if (response.data.result.status === 'success'
          && selectedDirectory === getters.selectedDirectory
      ) {
        // refresh content
        dispatch('refreshAll');
      }

      return response;
    });
  },

  /** *********************************************************************************************
   * Helper functions
   */

  /**
   * Refresh content in the manager/s
   * @param dispatch
   * @param state
   * @returns {*}
   */
  refreshManagers({ dispatch, state }) {
    // select what needs to be an updated
    if (state.settings.windowsConfig === 3) {
      return Promise.all([
        // left manager
        dispatch('left/refreshDirectory'),
        // right manager
        dispatch('right/refreshDirectory'),
      ]);
    }

    // only left manager
    return dispatch('left/refreshDirectory');
  },

  /**
   * Refresh All
   * @param state
   * @param getters
   * @param dispatch
   * @returns {*}
   */
  refreshAll({ state, getters, dispatch }) {
    if (state.settings.windowsConfig === 2) {
      // refresh tree
      return dispatch('tree/initTree', state.left.selectedDisk).then(() => Promise.all([
        // reopen folders if need
        dispatch('tree/reopenPath', getters.selectedDirectory),
        // refresh manager/s
        dispatch('refreshManagers'),
      ]));
    }
    // refresh manager/s
    return dispatch('refreshManagers');
  },

  /**
   * Repeat sorting
   * @param state
   * @param dispatch
   * @param manager
   */
  repeatSort({ state, dispatch }, manager) {
    dispatch(`${manager}/sortBy`, {
      field: state[manager].sort.field,
      direction: state[manager].sort.direction,
    });
  },

  /**
   * Update content - files, folders after create or update
   * @param state
   * @param commit
   * @param getters
   * @param dispatch
   * @param response
   * @param oldDir
   * @param commitName
   * @param type
   */
  updateContent({ state, commit, getters, dispatch }, { response, oldDir, commitName, type }) {
    // if operation success
    if (
      response.data.result.status === 'success' &&
      oldDir === getters.selectedDirectory
    ) {
      // add/update file/folder in to the files/folders list
      commit(`${state.activeManager}/${commitName}`, response.data[type]);
      // repeat sort
      dispatch('repeatSort', state.activeManager);

      // if tree module is showing
      if (type === 'directory' && state.settings.windowsConfig === 2) {
        // update tree module
        dispatch('tree/addToTree', {
          parentPath: oldDir,
          newDirectory: response.data.tree,
        });

        // if both managers show the same folder
      } else if (
        state.settings.windowsConfig === 3 &&
        state.left.selectedDirectory === state.right.selectedDirectory &&
        state.left.selectedDisk === state.right.selectedDisk
      ) {
        // add/update file/folder in to the files/folders list (inactive manager)
        commit(`${getters.inactiveManager}/${commitName}`, response.data[type]);
        // repeat sort
        dispatch('repeatSort', getters.inactiveManager);
      }
    }
  },
};
