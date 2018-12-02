/**
 * Context menu actions
 * {name}Action
 */
export default {
  methods: {
    /**
     * Open folder
     */
    openAction() {
      // select directory
      this.$store.dispatch(`fm/${this.$store.state.fm.activeManager}/selectDirectory`, {
        path: this.selectedItems[0].path,
        history: true,
      });
    },

    /**
     * Play music or video
     */
    audioPlayAction() {
      // show player modal
      this.$store.commit('fm/modal/setModalState', {
        modalName: 'AudioPlayer',
        show: true,
      });
    },

    /**
     * Play music or video
     */
    videoPlayAction() {
      // show player modal
      this.$store.commit('fm/modal/setModalState', {
        modalName: 'VideoPlayer',
        show: true,
      });
    },

    /**
     * View file
     */
    viewAction() {
      // show image
      this.$store.commit('fm/modal/setModalState', {
        modalName: 'Preview',
        show: true,
      });
    },

    /**
     * Edit file
     */
    editAction() {
      // show text file
      this.$store.commit('fm/modal/setModalState', {
        modalName: 'TextEdit',
        show: true,
      });
    },

    /**
     * Select file
     */
    selectAction() {
      // file callback
      this.$store.dispatch('fm/url', {
        disk: this.selectedDisk,
        path: this.selectedItems[0].path,
      });
    },

    /**
     * Download file
     */
    downloadAction() {
      // download file
      const tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = this.downloadLink();
      tempLink.setAttribute('download', this.selectedItems[0].basename);
      tempLink.setAttribute('target', '_blank');
      document.body.appendChild(tempLink);
      // click link
      tempLink.click();
      // remove link
      document.body.removeChild(tempLink);
    },

    /**
     * Copy selected items
     */
    copyAction() {
      // add selected items to the clipboard
      this.$store.dispatch('fm/toClipboard', 'copy');
    },

    /**
     * Cut selected items
     */
    cutAction() {
      // add selected items to the clipboard
      this.$store.dispatch('fm/toClipboard', 'cut');
    },

    /**
     * Rename selected item
     */
    renameAction() {
      // show modal - rename
      this.$store.commit('fm/modal/setModalState', {
        modalName: 'Rename',
        show: true,
      });
    },

    /**
     * Paste copied or cut items
     */
    pasteAction() {
      // paste items in the selected folder
      this.$store.dispatch('fm/paste');
    },

    /**
     * Zip selected files
     */
    zipAction() {
      // show modal - Zip
      this.$store.commit('fm/modal/setModalState', {
        modalName: 'Zip',
        show: true,
      });
    },

    /**
     * Unzip selected archive
     */
    unzipAction() {
      // show modal - Unzip
      this.$store.commit('fm/modal/setModalState', {
        modalName: 'Unzip',
        show: true,
      });
    },

    /**
     * Delete selected items
     */
    deleteAction() {
      // show modal - delete
      this.$store.commit('fm/modal/setModalState', {
        modalName: 'Delete',
        show: true,
      });
    },

    /**
     * Show properties for selected items
     */
    propertiesAction() {
      // show modal - properties
      this.$store.commit('fm/modal/setModalState', {
        modalName: 'Properties',
        show: true,
      });
    },
  },
};
