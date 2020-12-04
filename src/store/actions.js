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
        commit('settings/initSettings', response.data.config);
        commit('setDisks', response.data.config.disks);

        let leftDisk = response.data.config.leftDisk
          ? response.data.config.leftDisk
          : getters.diskList[0];

        let rightDisk = response.data.config.rightDisk
          ? response.data.config.rightDisk
          : getters.diskList[0];

        // paths
        let leftPath = response.data.config.leftPath;
        let rightPath = response.data.config.rightPath;

        // find disk and path settings in the URL
        if (window.location.search) {
          const params = new URLSearchParams(window.location.search);

          if (params.get('leftDisk')) {
            leftDisk = params.get('leftDisk');
          }

          if (params.get('rightDisk')) {
            rightDisk = params.get('rightDisk');
          }

          if (params.get('leftPath')) {
            leftPath = params.get('leftPath');
          }

          if (params.get('rightPath')) {
            rightPath = params.get('rightPath');
          }
        }

        commit('left/setDisk', leftDisk);

        // if leftPath not null
        if (leftPath) {
          commit('left/setSelectedDirectory', leftPath);
          commit('left/addToHistory', leftPath);
        }

        dispatch('getLoadContent', {
          manager: 'left',
          disk: leftDisk,
          path: leftPath,
        });

        // if selected left and right managers
        if (state.settings.windowsConfig === 3) {
          commit('right/setDisk', rightDisk);

          // if rightPath not null
          if (rightPath) {
            commit('right/setSelectedDirectory', rightPath);
            commit('right/addToHistory', rightPath);
          }

          dispatch('getLoadContent', {
            manager: 'right',
            disk: rightDisk,
            path: rightPath,
          });
        } else if (state.settings.windowsConfig === 2) {
          // if selected left manager and directories tree
          // init directories tree
          dispatch('tree/initTree', leftDisk).then(() => {
            if (leftPath) {
              // reopen folders if path not null
              dispatch('tree/reopenPath', leftPath);
            }
          });
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
    return POST.createFile(getters.selectedDisk, selectedDirectory, fileName)
      .then((response) => {
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
    return POST.updateFile(formData).then((response) => {
      // update file list
      dispatch('updateContent', {
        response,
        oldDir: getters.selectedDirectory,
        commitName: 'updateFile',
        type: 'file',
      });

      return response;
    });
  },

  /**
   * Create new directory
   * @param getters
   * @param dispatch
   * @param name
   * @returns {*|PromiseLike<T | never>|Promise<T | never>}
   */
  createDirectory({ getters, dispatch }, name) {
    // directory for new folder
    const selectedDirectory = getters.selectedDirectory;

    // create new directory, server side
    return POST.createDirectory({
      disk: getters.selectedDisk,
      path: selectedDirectory,
      name,
    }).then((response) => {
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
   * @returns {*|PromiseLike<T | never>|Promise<T | never>}
   */
  delete({ state, getters, dispatch }, items) {
    return POST.delete({
      disk: getters.selectedDisk,
      items,
    }).then((response) => {
      // if all items deleted successfully
      if (response.data.result.status === 'success') {
        // refresh content
        dispatch('refreshManagers');

        // delete directories from tree
        if (state.settings.windowsConfig === 2) {
          const onlyDir = items.filter((item) => item.type === 'dir');
          dispatch('tree/deleteFromTree', onlyDir);
        }
      }

      return response;
    });
  },

  /**
   * Paste files and folders
   * @param state
   * @param commit
   * @param getters
   * @param dispatch
   */
  paste({ state, commit, getters, dispatch }) {
    POST.paste({
      disk: getters.selectedDisk,
      path: getters.selectedDirectory,
      clipboard: state.clipboard,
    }).then((response) => {
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
    return POST.rename({
      disk: getters.selectedDisk,
      newName,
      oldName,
      type,
    }).then((response) => {
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
   * @param store
   * @param disk
   * @param path
   * @returns {Promise}
   */
  url(store, { disk, path }) {
    return GET.url(disk, path);
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

    return POST.zip({
      disk: getters.selectedDisk,
      path: selectedDirectory,
      name,
      elements: state[state.activeManager].selected,
    }).then((response) => {
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
      // if unzipped successfully
      if (response.data.result.status === 'success'
          && selectedDirectory === getters.selectedDirectory
      ) {
        // refresh
        dispatch('refreshAll');
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
        directories: state[state.activeManager].selected.directories.slice(0),
        files: state[state.activeManager].selected.files.slice(0),
      });
    }
  },

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
  refreshAll({ state, commit, getters, dispatch }) {
    commit('setRefreshing');
    if (state.settings.windowsConfig === 2) {
      // refresh tree
      return dispatch('tree/initTree', state.left.selectedDisk).then(() => Promise.all([
        // reopen folders if need
        dispatch('tree/reopenPath', getters.selectedDirectory),
        // refresh manager/s
        dispatch('refreshManagers').then(() => {
          commit('setRefreshing');
        }),
      ]));
    }
    // refresh manager/s
    return dispatch('refreshManagers').then(() => {
      commit('setRefreshing');
    });
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
      response.data.result.status === 'success'
      && oldDir === getters.selectedDirectory
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
        state.settings.windowsConfig === 3
        && state.left.selectedDirectory === state.right.selectedDirectory
        && state.left.selectedDisk === state.right.selectedDisk
      ) {
        // add/update file/folder in to the files/folders list (inactive manager)
        commit(`${getters.inactiveManager}/${commitName}`, response.data[type]);
        // repeat sort
        dispatch('repeatSort', getters.inactiveManager);
      }
    }
  },

  /**
   * Reset application state
   * @param state
   * @param commit
   */
  resetState({ state, commit }) {
    // left manager
    commit('left/setDisk', null);
    commit('left/setSelectedDirectory', null);
    commit('left/setDirectoryContent', { directories: [], files: [] });
    commit('left/resetSelected');
    commit('left/resetSortSettings');
    commit('left/resetHistory');
    commit('left/setView', 'table');
    // modals
    commit('modal/clearModal');
    // messages
    commit('messages/clearActionResult');
    commit('messages/clearProgress');
    commit('messages/clearLoading');
    commit('messages/clearErrors');

    if (state.settings.windowsConfig === 3) {
      // right manager
      commit('right/setDisk', null);
      commit('right/setSelectedDirectory', null);
      commit('right/setDirectoryContent', { directories: [], files: [] });
      commit('right/resetSelected');
      commit('right/resetSortSettings');
      commit('right/resetHistory');
      commit('right/setView', 'table');
    } else if (state.settings.windowsConfig === 2) {
      // tree
      commit('tree/cleanTree');
      commit('tree/clearTempArray');
    }

    commit('resetState');
  },

  /**
   * Open PDF
   * @param context
   * @param disk
   * @param path
   */
  openPDF(context, { disk, path }) {
    const win = window.open();

    GET.getFileArrayBuffer(disk, path).then((response) => {
      const blob = new Blob([response.data], { type: 'application/pdf' });

      win.document.write(`<iframe src="${URL.createObjectURL(blob)}" allowfullscreen height="100%" width="100%"></iframe>`);
    });
  },
};
