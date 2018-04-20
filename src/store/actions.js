/* eslint-disable max-len */
import GET from '../http/get-queries';
import POST from '../http/post-queries';

export default {
  /**
   * Get init data from server
   * @param context
   */
  initializeApp(context) {
    GET.initialize().then((response) => {
      if (response.data.result.status === 'success') {
        // set app settings
        context.commit('settings/initSettings', response.data.config);

        // set disk list
        context.commit('setDiskList', response.data.config.diskList);

        const leftDisk = response.data.config.leftDisk
          ? response.data.config.leftDisk
          : response.data.config.diskList[0];

        const rightDisk = response.data.config.rightDisk
          ? response.data.config.rightDisk
          : response.data.config.diskList[0];

        // left manager - set default disk
        context.commit('left/setDisk', leftDisk);

        // load content to the left file manager
        context.dispatch('getLoadContent', {
          manager: 'left',
          disk: leftDisk,
          path: null,
        });

        // initialize the app depending on the settings
        if (context.state.settings.windowsConfig === 3) {
          // if selected left and right managers
          context.commit('right/setDisk', rightDisk);

          // load content to the right file manager
          context.dispatch('getLoadContent', {
            manager: 'right',
            disk: rightDisk,
            path: null,
          });
        } else if (context.state.settings.windowsConfig === 2) {
          // if selected left manager and directories tree
          // init directories tree
          context.dispatch('tree/initTree', leftDisk);
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
   * SelectDisk
   * @param context
   * @param disk
   * @param manager
   */
  selectDisk(context, { disk, manager }) {
    GET.selectDisk(disk).then((response) => {
      // if disk exist => change disk
      if (response.data.result.status === 'success') {
        // set disk name
        context.commit(`${manager}/setDisk`, disk);

        // reset history
        context.commit(`${manager}/resetHistory`);

        // reinitialize tree if directories tree is shown
        if (context.state.settings.windowsConfig === 2) {
          context.dispatch('tree/initTree', disk);
        }

        // download content for root path
        context.dispatch(`${manager}/selectDirectory`, { path: null, history: false });
      }
    });
  },

  /**
   * Refresh All
   * @param context
   */
  refreshAll(context) {
    if (context.state.settings.windowsConfig === 2) {
      // refresh tree
      return context.dispatch('tree/initTree', context.state.left.selectedDisk).then(() => Promise.all([
        // reopen folders if need
        context.dispatch('tree/reopenPath', context.getters.selectedDirectory),
        // refresh manager/s
        context.dispatch('refreshManagers'),
      ]));
    }
    // refresh manager/s
    return context.dispatch('refreshManagers');
  },

  /**
   * Refresh content in the manager/s
   * @param context
   */
  refreshManagers(context) {
    // select what needs to be an updated
    if (context.rootState.fm.settings.windowsConfig === 3) {
      return Promise.all([
        // left manager
        context.dispatch('left/refreshDirectory'),
        // right manager
        context.dispatch('right/refreshDirectory'),
      ]);
    }

    // only left manager
    return context.dispatch('left/refreshDirectory');
  },

  /**
   * Create new directory
   * @param context
   * @param folderName
   */
  createDirectory(context, folderName) {
    // directory for new folder
    const selectedDirectory = context.getters.selectedDirectory;

    // create new directory, server side
    return POST.createDirectory(
      context.getters.selectedDisk,
      selectedDirectory,
      folderName,
    ).then((response) => {
      // if folder created successfully
      if (
        response.data.result.status === 'success'
        && selectedDirectory === context.getters.selectedDirectory
      ) {
        // active manager name
        const activeManager = context.state.activeManager;

        // add new folder in to the folders list
        context.commit(
          `${activeManager}/addNewDirectory`,
          response.data.directory,
        );

        // repeat sort
        context.dispatch(`${activeManager}/sortBy`, {
          field: context.state[activeManager].sort.field,
          direction: context.state[activeManager].sort.direction,
        });

        // if tree module is showing
        if (context.state.settings.windowsConfig === 2) {
          // update tree module
          context.dispatch('tree/addToTree',
            {
              parentPath: selectedDirectory,
              newDirectory: response.data.tree,
            });

          // if showing two window manager
        } else if (context.state.settings.windowsConfig === 3) {
          // add a new folder if in the another manager showing the same folder
          if (context.state.left.selectedDirectory === context.state.right.selectedDirectory
            && context.state.left.selectedDisk === context.state.right.selectedDisk) {
            // add new folder in folders list (inactive manager)
            context.commit(
              `${context.getters.inactiveManager}/addNewDirectory`,
              response.data.directory,
            );
          }
        }
      }

      return response;
    });
  },

  /**
   * Upload file or files
   * @param context
   * @param files
   * @param overwrite
   */
  upload(context, { files, overwrite }) {
    // create new form data
    const data = new FormData();
    // directory where files will be uploaded
    const selectedDirectory = context.getters.selectedDirectory;

    // add disk name
    data.append('disk', context.getters.selectedDisk);

    // add path name
    data.append('path', selectedDirectory || '');

    // upload settings
    data.append('overwrite', overwrite);

    // add file or files
    for (let i = 0; i < files.length; i += 1) {
      data.append('files[]', files[i]);
    }

    // axios config - progress bar
    const config = {
      onUploadProgress(progressEvent) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        context.commit('messages/setProgress', progress);
      },
    };

    // upload files
    return POST.upload(data, config).then((response) => {
      // clear progress
      context.commit('messages/clearProgress');

      // if files uploaded successfully
      if (
        response.data.result.status === 'success'
        && selectedDirectory === context.getters.selectedDirectory
      ) {
        // refresh content
        context.dispatch('refreshManagers');
      }

      return response;
    }).catch(() => {
      // clear progress
      context.commit('messages/clearProgress');
    });
  },

  /**
   * Delete selected files and folders
   * @param context
   * @param items
   */
  delete(context, items) {
    return POST.delete(
      context.getters.selectedDisk,
      items,
    ).then((response) => {
      // if all items deleted successfully
      if (response.data.result.status === 'success') {
        // refresh content
        context.dispatch('refreshManagers');

        // delete directories from tree
        if (context.state.settings.windowsConfig === 2) {
          const onlyDir = items.filter(item => item.type === 'dir');
          context.dispatch('tree/deleteFromTree', onlyDir);
        }
      }

      return response;
    });
  },

  /**
   * Add selected items to clipboard
   * @param context
   * @param type
   */
  toClipboard(context, type) {
    const activeManager = context.state.activeManager;

    if (context.getters[`${activeManager}/selectedCount`]) {
      context.commit('setClipboard', {
        type,
        disk: context.state[activeManager].selectedDisk,
        directories: context.state[activeManager].selected.directories.map(item => item),
        files: context.state[activeManager].selected.files.map(item => item),
      });
    }
  },

  /**
   * Paste files and folders
   * @param context
   */
  paste(context) {
    // create new form data
    const data = new FormData();
    // copy/cut to this folder
    const selectedDirectory = context.getters.selectedDirectory;

    // add disk name
    data.append('disk', context.getters.selectedDisk);

    // add path name
    data.append('path', selectedDirectory);

    // add clipboard
    data.append('clipboard', JSON.stringify(context.state.clipboard));

    POST.paste(
      context.getters.selectedDisk,
      selectedDirectory,
      context.state.clipboard,
    ).then((response) => {
      // if the action was successful
      if (response.data.result.status === 'success') {
        // refresh content
        context.dispatch('refreshAll');

        // if action - cut - clear clipboard
        if (context.state.clipboard.type === 'cut') {
          context.commit('resetClipboard');
        }
      }
    });
  },

  /**
   * Rename file or folder
   * @param context
   * @param type
   * @param newName
   * @param oldName
   * @returns {Promise<T>}
   */
  rename(context, { type, newName, oldName }) {
    return POST.rename(
      context.getters.selectedDisk,
      newName,
      oldName,
    ).then((response) => {
      // refresh content
      if (type === 'dir') {
        context.dispatch('refreshAll');
      } else {
        context.dispatch('refreshManagers');
      }

      return response;
    });
  },

  /**
   * Get file url
   * @param context
   * @param disk
   * @param path
   */
  url(context, { disk, path }) {
    GET.url(disk, path).then((response) => {
      if (response.data.result.status === 'success') {
        context.state.fileCallback(response.data.url);
      }
    });
  },
};
