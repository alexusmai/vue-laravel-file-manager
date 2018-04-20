import HTTP from './axios-settings';

const postQueries = {
  /**
   * Create new directory
   * @param disk
   * @param path
   * @param name
   * @returns {AxiosPromise<any>}
   */
  createDirectory(disk, path, name) {
    return HTTP.post('create-directory', {
      disk,
      path,
      name,
    });
  },

  /**
   * Upload file
   * @param formData
   * @param config
   * @returns {AxiosPromise<any>}
   */
  upload(formData, config) {
    return HTTP.post('upload', formData, config);
  },

  /**
   * Delete selected items
   * @param disk
   * @param items
   * @returns {AxiosPromise<any>}
   */
  delete(disk, items) {
    return HTTP.post('delete',
      {
        disk,
        items,
      },
    );
  },

  /**
   * Rename file or folder
   * @param disk
   * @param newName
   * @param oldName
   * @returns {AxiosPromise<any>}
   */
  rename(disk, newName, oldName) {
    return HTTP.post('rename',
      {
        disk,
        newName,
        oldName,
      },
    );
  },

  /**
   * Copy / Cut files and folders
   * @param disk
   * @param path
   * @param clipboard
   * @returns {AxiosPromise<any>}
   */
  paste(disk, path, clipboard) {
    return HTTP.post('paste', {
      disk,
      path,
      clipboard,
    });
  },
};

export default postQueries;
