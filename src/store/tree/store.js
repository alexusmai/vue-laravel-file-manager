import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export default {
  namespaced: true,
  state() {
    return {
      /**
       * directories.id (int), el id
       * directories.basename                       (string), folder name
       * directories.dirname                        (string) directory name
       * directories.path                           (string), path to directory
       * directories.props                          (object), directory properties
       * directories.props.hasSubdirectories        (boolean), has child directories,
       * directories.props.subdirectoriesLoaded     (boolean), child directories loaded
       * directories.props.showSubdirectories       (boolean), show or hide subdirectories branch
       * directories.parentId                       (int), parent id
       */
      directories: [],

      // directories id counter
      counter: 1,

      // directories array for deleting(indexes)
      tempIndexArray: [],
    };
  },
  mutations,
  getters,
  actions,
};
