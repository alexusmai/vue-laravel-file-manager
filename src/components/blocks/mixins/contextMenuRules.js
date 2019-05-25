/**
 * Rules for context menu items (show/hide)
 * {name}Rule
 */
export default {
  methods: {
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
      return this.$store.state.fm.settings.extConfig.canCopy;
    },

    /**
     * Cut - menu item status - show or hide
     * @returns {boolean}
     */
    cutRule() {
      return this.$store.state.fm.settings.extConfig.canCut;
    },

    /**
     * Rename - menu item status - show or hide
     * @returns {boolean}
     */
    renameRule() {
      return !this.multiSelect &&
             this.$store.state.fm.settings.extConfig.canRename;
    },

    /**
     * Paste - menu item status - show or hide
     * @returns {boolean}
     */
    pasteRule() {
      return !!this.$store.state.fm.clipboard.type &&
             this.$store.state.fm.settings.extConfig.canPaste;
    },

    /**
     * Zip - menu item status - show or hide
     * @returns {boolean}
     */
    zipRule() {
      return this.selectedDiskDriver === 'local' &&
             this.$store.state.fm.settings.extConfig.canZip;
    },

    /**
     * Unzip - menu item status - show or hide
     * @returns {boolean}
     */
    unzipRule() {
      return this.selectedDiskDriver === 'local' &&
          !this.multiSelect &&
          this.firstItemType === 'file' &&
          this.isZip(this.selectedItems[0].extension) &&
          this.$store.state.fm.settings.extConfig.canUnzip;
    },

    /**
     * Delete - menu item status - show or hide
     * @returns {boolean}
     */
    deleteRule() {
      return this.$store.state.fm.settings.extConfig.canDelete;
    },

    /**
     * Properties - menu item status - show or hide
     * @returns {boolean}
     */
    propertiesRule() {
      return !this.multiSelect;
    },
  },
};
