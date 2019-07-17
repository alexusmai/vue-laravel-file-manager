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
     * Driver for selected disk
     * @returns {*}
     */
    selectedDiskDriver() {
      return this.$store.state.fm.disks[this.selectedDisk].driver;
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
     * Zip archive or not
     * @param extension
     * @returns {boolean}
     */
    isZip(extension) {
      // extension not found
      if (!extension) return false;

      return extension.toLowerCase() === 'zip';
    },
  },
};
