import { apiURL } from './../http/helper';

export default {
  computed: {
    /**
     * Selected disk
     * @returns {*}
     */
    selectedDisk() {
      return this.$store.getters['fm/selectedDisk'];
    },

    /**
     * Selected items
     * @returns {*}
     */
    selectedItems() {
      return this.$store.getters['fm/selectedItems'];
    },

    /**
     * Multi selection
     * @returns {boolean}
     */
    multiSelect() {
      return this.$store.getters['fm/selectedItems'].length > 1;
    },

    /**
     * First item type - dir or file
     * @returns {*}
     */
    firstItemType() {
      return this.$store.getters['fm/selectedItems'][0].type;
    },
  },
  methods: {
    /** ********************************************************************************************
     * Rules for context menu items
     * Show or Hide
     */

    /**
     * Open - menu item status - show or hide
     * @returns {boolean}
     */
    openRule() {
      return !this.multiSelect && this.firstItemType === 'dir';
    },

    /**
     * Play audio - menu item status - show or hide
     * @returns {boolean}
     */
    audioPlayRule() {
      return this.selectedItems.every(elem => elem.type === 'file') &&
        this.selectedItems.every(elem => this.canAudioPlay(elem.extension));
    },

    /**
     * Play video - menu item status - show or hide
     * @returns {boolean}
     */
    videoPlayRule() {
      return !this.multiSelect && this.canVideoPlay(this.selectedItems[0].extension);
    },

    /**
     * View - menu item status - show or hide
     * @returns {boolean|*}
     */
    viewRule() {
      return !this.multiSelect &&
        this.firstItemType === 'file' &&
        this.canView(this.selectedItems[0].extension);
    },

    /**
     * Edit - menu item status - show or hide
     * @returns {boolean|*}
     */
    editRule() {
      return !this.multiSelect &&
        this.firstItemType === 'file' &&
        this.canEdit(this.selectedItems[0].extension);
    },

    /**
     * Select - menu item status - show or hide
     * @returns {boolean|null}
     */
    selectRule() {
      return !this.multiSelect && this.firstItemType === 'file' &&
        this.$store.state.fm.fileCallback;
    },

    /**
     * Download - menu item status - show or hide
     * @returns {boolean}
     */
    downloadRule() {
      return !this.multiSelect && this.firstItemType === 'file';
    },

    /**
     * Copy - menu item status - show or hide
     * @returns {boolean}
     */
    copyRule() {
      return true;
    },

    /**
     * Cut - menu item status - show or hide
     * @returns {boolean}
     */
    cutRule() {
      return true;
    },

    /**
     * Rename - menu item status - show or hide
     * @returns {boolean}
     */
    renameRule() {
      return !this.multiSelect;
    },

    /**
     * Paste - menu item status - show or hide
     * @returns {boolean}
     */
    pasteRule() {
      return !!this.$store.state.fm.clipboard.type;
    },

    /**
     * Delete - menu item status - show or hide
     * @returns {boolean}
     */
    deleteRule() {
      return true;
    },

    /**
     * Properties - menu item status - show or hide
     * @returns {boolean}
     */
    propertiesRule() {
      return !this.multiSelect;
    },

    /** ********************************************************************************************
     * Menu items actions
     */

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
    // ================================ END ================================================

    /**
     * Can we show this item?
     * @param extension
     * @returns {boolean}
     */
    canView(extension) {
      // extension not found
      if (!extension) return false;

      return this.$store.state.fm.settings.imageExtensions.includes(extension.toLowerCase());
    },

    /**
     * Can we edit this file in the code editor?
     * @param extension
     * @returns {boolean}
     */
    canEdit(extension) {
      // extension not found
      if (!extension) return false;

      return Object.keys(this.$store.state.fm.settings.textExtensions)
        .includes(extension.toLowerCase());
    },

    /**
     * Can we play this audio file?
     * @param extension
     * @returns {boolean}
     */
    canAudioPlay(extension) {
      // extension not found
      if (!extension) return false;

      return this.$store.state.fm.settings.audioExtensions.includes(extension.toLowerCase());
    },

    /**
     * Can we play this video file?
     * @param extension
     * @returns {boolean}
     */
    canVideoPlay(extension) {
      // extension not found
      if (!extension) return false;

      return this.$store.state.fm.settings.videoExtensions.includes(extension.toLowerCase());
    },

    /**
     * Generate link for downloading selected file
     * @returns {string}
     */
    downloadLink() {
      return `${apiURL()}download?disk=${this.selectedDisk}&path=${encodeURIComponent(this.selectedItems[0].path)}`;
    },
  },
};
