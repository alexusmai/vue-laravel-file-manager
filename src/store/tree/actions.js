import GET from '../../http/get';

export default {
  /**
   * Initialize directories tree
   * @param state
   * @param commit
   * @param disk
   * @returns {Promise}
   */
  initTree({ state, commit }, disk) {
    return GET.tree(disk, null).then((response) => {
      // if the action was successful
      if (response.data.result.status === 'success') {
        // clean the tree, if need
        if (state.directories) commit('cleanTree');

        // initialize directories tree
        commit('addDirectories', {
          parentId: 0,
          directories: response.data.directories,
        });
      }
    });
  },

  /**
   * Add new directory to the tree
   * @param state
   * @param commit
   * @param getters
   * @param parentPath
   * @param newDirectory
   */
  addToTree({ state, commit, getters }, { parentPath, newDirectory }) {
    // If this directory is not the root directory
    if (parentPath) {
      // find parent directory index
      const parentDirectoryIndex = getters.findDirectoryIndex(parentPath);

      if (parentDirectoryIndex !== -1) {
        // add a new directory
        commit('addDirectories', {
          directories: newDirectory,
          parentId: state.directories[parentDirectoryIndex].id,
        });

        // update parent directory property
        commit('updateDirectoryProps', {
          index: parentDirectoryIndex,
          props: {
            hasSubdirectories: true,
            showSubdirectories: true,
            subdirectoriesLoaded: true,
          },
        });
      } else {
        commit('fm/messages/setError', { message: 'Directory not found' }, { root: true });
      }
    } else {
      // add a new directory to the root of the disk
      commit('addDirectories', {
        directories: newDirectory,
        parentId: 0,
      });
    }
  },

  /**
   * Delete directories and subdirectories from tree
   * @param state
   * @param commit
   * @param getters
   * @param dispatch
   * @param directories
   */
  deleteFromTree({
    state, commit, getters, dispatch,
  }, directories) {
    directories.forEach((item) => {
      // find this directory in the tree
      const directoryIndex = getters.findDirectoryIndex(item.path);

      if (directoryIndex !== -1) {
        // add directory index to array for deleting
        commit('addToTempArray', directoryIndex);

        // if directory has subdirectories
        if (state.directories[directoryIndex].props.hasSubdirectories) {
          // find subDirectories
          dispatch('subDirsFinder', state.directories[directoryIndex].id);
        }
      }
    });

    // filter directories
    const temp = state.directories.filter((item, index) => {
      if (state.tempIndexArray.indexOf(index) === -1) {
        return item;
      }
      return false;
    });

    // replace directories
    commit('replaceDirectories', temp);

    // clear temp array
    commit('clearTempArray');
  },

  /**
   * Find subdirectories
   * @param state
   * @param commit
   * @param dispatch
   * @param parentId
   */
  subDirsFinder({ state, commit, dispatch }, parentId) {
    // find sub directories
    state.directories.forEach((item, index) => {
      if (item.parentId === parentId) {
        // add directory index to array
        commit('addToTempArray', index);

        // if directory has subdirectories
        if (item.props.hasSubdirectories) {
          // find subDirectories
          dispatch('subDirsFinder', item.id);
        }
      }
    });
  },

  /**
   * Get subDirectories from server
   * @param commit
   * @param rootGetters
   * @param path
   * @param parentId
   * @param parentIndex
   * @returns {Promise}
   */
  getSubdirectories({ commit, rootGetters }, { path, parentId, parentIndex }) {
    return GET.tree(rootGetters['fm/selectedDisk'], path).then((response) => {
      // if the action was successful
      if (response.data.result.status === 'success') {
        // add directories
        commit('addDirectories', {
          parentId,
          directories: response.data.directories,
        });

        // update properties at parent directory
        commit('updateDirectoryProps', {
          index: parentIndex,
          props: {
            subdirectoriesLoaded: true,
          },
        });
      }
    });
  },

  /**
   * Show subdirectories
   * @param state
   * @param commit
   * @param getters
   * @param dispatch
   * @param path
   * @returns {*}
   */
  showSubdirectories({
    state, commit, getters, dispatch,
  }, path) {
    const promise = Promise.resolve();
    // find parent directory index
    const parentDirectoryIndex = getters.findDirectoryIndex(path);

    if (parentDirectoryIndex !== -1) {
      // Are the subdirectories loaded?
      if (state.directories[parentDirectoryIndex].props.subdirectoriesLoaded) {
        // update directory properties
        commit('updateDirectoryProps', {
          index: parentDirectoryIndex,
          props: {
            showSubdirectories: true,
          },
        });
      } else {
        // load subdirectories
        return dispatch('getSubdirectories', {
          path: state.directories[parentDirectoryIndex].path,
          parentId: state.directories[parentDirectoryIndex].id,
          parentIndex: parentDirectoryIndex,
        }).then(() => {
          // update properties in the parent directory
          commit('updateDirectoryProps', {
            index: parentDirectoryIndex,
            props: {
              showSubdirectories: true,
            },
          });
        });
      }
    } else {
      commit('fm/messages/setError', { message: 'Directory not found' }, { root: true });
    }

    return promise;
  },

  /**
   * Hide subdirectories
   * @param commit
   * @param getters
   * @param path
   */
  hideSubdirectories({ commit, getters }, path) {
    // find parent directory index
    const parentDirectoryIndex = getters.findDirectoryIndex(path);

    if (parentDirectoryIndex !== -1) {
      // hide subdirectories
      commit('updateDirectoryProps', {
        index: parentDirectoryIndex,
        props: {
          showSubdirectories: false,
        },
      });
    } else {
      commit('fm/messages/setError', { message: 'Directory not found' }, { root: true });
    }
  },

  /**
   * Reopen tree directories by selected path
   * @param dispatch
   * @param path
   * @returns {Promise<void>}
   */
  reopenPath({ dispatch }, path) {
    let promises = Promise.resolve();

    if (path) {
      const splitPath = path.split('/');

      for (let i = 0; splitPath.length > i; i += 1) {
        promises = promises.then(() => dispatch(
          'showSubdirectories',
          splitPath.slice(0, i + 1).join('/'),
        ));
      }

      return promises;
    }

    return promises;
  },
};
