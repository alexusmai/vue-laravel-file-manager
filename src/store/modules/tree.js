/* eslint-disable no-restricted-syntax,no-param-reassign */
import GET from '../../http/get-queries';

const tree = {
  namespaced: true,
  state: {

    /**
     * directories.id (int), el id
     * directories.name                         (string), directory name
     * directories.path                         (string), path to directory
     * directories.props                        (object), directory properties
     * directories.props.hasSubdirectories        (boolean), has child directories,
     * directories.props.subdirectoriesLoaded     (boolean), child directories loaded
     * directories.props.showSubdirectories       (boolean), show or hide subdirectories branch
     * directories.parentId                     (int), parent id
     */
    directories: [],

    // directories id counter
    counter: 1,

    // directories array for deleting(indexes)
    tempIndexArray: [],

  },
  mutations: {

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
  },
  getters: {
    /**
     * Find directory index in the tree
     * @param state
     */
    findDirectoryIndex: state => (path) => {
      for (let i = 0; i < state.directories.length; i += 1) {
        if (state.directories[i].path === path) {
          // return directory index
          return i;
        }
      }

      return -1;
    },
  },
  actions: {

    /**
     * Initialize directories tree
     * @param context
     * @param disk
     */
    initTree(context, disk) {
      return GET.tree(disk, null).then((response) => {
        // if the action was successful
        if (response.data.result.status === 'success') {
          // clean the tree, if need
          if (context.state.directories) context.commit('cleanTree');

          // initialize directories tree
          context.commit('addDirectories', {
            parentId: 0,
            directories: response.data.directories,
          });
        }
      });
    },

    /**
     * Add new directory to the tree
     * @param context
     * @param parentPath
     * @param newDirectory
     */
    addToTree(context, { parentPath, newDirectory }) {
      // If this directory is not the root directory
      if (parentPath) {
        // find parent directory index
        const parentDirectoryIndex = context.getters.findDirectoryIndex(parentPath);

        if (parentDirectoryIndex !== -1) {
          // add a new directory
          context.commit('addDirectories', {
            directories: newDirectory,
            parentId: context.state.directories[parentDirectoryIndex].id,
          });

          // update parent directory property
          context.commit('updateDirectoryProps', {
            index: parentDirectoryIndex,
            props: {
              hasSubdirectories: true,
              showSubdirectories: true,
              subdirectoriesLoaded: true,
            },
          });
        } else {
          context.commit('fm/messages/setError', {
            message: 'Directory not found',
          }, { root: true });
        }
      } else {
        // add a new directory to the root of the disk
        context.commit('addDirectories', {
          directories: newDirectory,
          parentId: 0,
        });
      }
    },

    /**
     * Delete directories and subdirectories from tree
     * @param context
     * @param directories
     */
    deleteFromTree(context, directories) {
      directories.forEach((item) => {
        // find this directory in the tree
        const directoryIndex = context.getters.findDirectoryIndex(item.path);

        if (directoryIndex !== -1) {
          // add directory index to array for deleting
          context.commit('addToTempArray', directoryIndex);

          // if directory has subdirectories
          if (context.state.directories[directoryIndex].props.hasSubdirectories) {
            // find subDirectories
            context.dispatch('subDirsFinder', context.state.directories[directoryIndex].id);
          }
        }
      });

      // filter directories
      const temp = context.state.directories.filter((item, index) => {
        if (context.state.tempIndexArray.indexOf(index) === -1) {
          return item;
        }
        return false;
      });

      // replace directories
      context.commit('replaceDirectories', temp);

      // clear temp array
      context.commit('clearTempArray');
    },


    /**
     * Find subdirectories
     * @param context
     * @param parentId
     */
    subDirsFinder(context, parentId) {
      // find sub directories
      context.state.directories.forEach((item, index) => {
        if (item.parentId === parentId) {
          // add directory index to array
          context.commit('addToTempArray', index);

          // if directory has subdirectories
          if (item.props.hasSubdirectories) {
            // find subDirectories
            context.dispatch('subDirsFinder', item.id);
          }
        }
      });
    },

    /**
     * Get subDirectories from server
     * @param context
     * @param path
     * @param parentId
     * @param parentIndex
     * @returns {Promise<T>}
     */
    getSubdirectories(context, { path, parentId, parentIndex }) {
      return GET.tree(
        context.rootGetters['fm/selectedDisk'],
        path,
      ).then((response) => {
        // if the action was successful
        if (response.data.result.status === 'success') {
          // add directories
          context.commit('addDirectories', {
            parentId,
            directories: response.data.directories,
          });

          // update properties at parent directory
          context.commit('updateDirectoryProps', {
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
     * @param context
     * @param path
     */
    showSubdirectories(context, path) {
      const promise = Promise.resolve();
      // find parent directory index
      const parentDirectoryIndex = context.getters.findDirectoryIndex(path);

      if (parentDirectoryIndex !== -1) {
        // Are the subdirectories loaded?
        if (context.state.directories[parentDirectoryIndex].props.subdirectoriesLoaded) {
          // update directory properties
          context.commit('updateDirectoryProps', {
            index: parentDirectoryIndex,
            props: {
              showSubdirectories: true,
            },
          });
        } else {
          // load subdirectories
          return context.dispatch('getSubdirectories', {
            path: context.state.directories[parentDirectoryIndex].path,
            parentId: context.state.directories[parentDirectoryIndex].id,
            parentIndex: parentDirectoryIndex,
          }).then(() => {
            // update properties in the parent directory
            context.commit('updateDirectoryProps', {
              index: parentDirectoryIndex,
              props: {
                showSubdirectories: true,
              },
            });
          });
        }
      } else {
        context.commit('fm/messages/setError', {
          message: 'Directory not found',
        }, { root: true });
      }

      return promise;
    },

    /**
     * Hide subdirectories
     * @param context
     * @param path
     */
    hideSubdirectories(context, path) {
      // find parent directory index
      const parentDirectoryIndex = context.getters.findDirectoryIndex(path);

      if (parentDirectoryIndex !== -1) {
        // hide subdirectories
        context.commit('updateDirectoryProps', {
          index: parentDirectoryIndex,
          props: {
            showSubdirectories: false,
          },
        });
      } else {
        context.commit('fm/messages/setError', {
          message: 'Directory not found',
        }, { root: true });
      }
    },

    /**
     * Reopen tree directories by selected path
     * @param context
     * @param path
     */
    reopenPath(context, path) {
      let promises = Promise.resolve();

      if (path) {
        const splitPath = path.split('/');

        for (let i = 0; splitPath.length > i; i += 1) {
          promises = promises.then(() => context.dispatch(
            'showSubdirectories',
            splitPath.slice(0, i + 1).join('/')));
        }

        return promises;
      }

      return promises;
    },
  },
};

export default tree;
