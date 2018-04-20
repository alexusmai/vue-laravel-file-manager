// Event bus
import EventBus from './../eventBus';

export default {
  computed: {
    selectedDisk() {
      return this.$store.state.fm[this.manager].selectedDisk;
    },

    // Selected directory
    selectedDirectory() {
      return this.$store.state.fm[this.manager].selectedDirectory;
    },

    // files list for selected directory
    files() {
      return this.$store.state.fm[this.manager].files;
    },

    // directories list for selected directory
    directories() {
      return this.$store.state.fm[this.manager].directories;
    },

    // selected files and folders
    selected() {
      return this.$store.state.fm[this.manager].selected;
    },
  },
  methods: {
    /**
     * Load selected directory and show files
     * @param path
     */
    selectDirectory(path) {
      this.$store.dispatch(`fm/${this.manager}/selectDirectory`, { path, history: true });
    },

    // Level up directory
    levelUp() {
      // if this a not root directory
      if (this.selectedDirectory) {
        // calculate up directory path
        const pathUp = this.selectedDirectory.split('/').slice(0, -1).join('/');

        // load directory
        this.$store.dispatch(`fm/${this.manager}/selectDirectory`, { path: pathUp || null, history: true });
      }
    },

    /**
     * Check item - selected
     * @param type
     * @param path
     */
    checkSelect(type, path) {
      return this.selected[type].includes(path);
    },

    /**
     * Select items in list (files + folders)
     * @param type
     * @param path
     * @param event
     */
    selectItem(type, path, event) {
      // search in selected array
      const alreadySelected = this.selected[type].includes(path);

      // if pressed Ctrl -> multi select
      if (event.ctrlKey) {
        if (!alreadySelected) {
          // add new selected item
          this.$store.commit(`fm/${this.manager}/setSelected`, { type, path });
        } else {
          // remove selected item
          this.$store.commit(`fm/${this.manager}/removeSelected`, { type, path });
        }
      }

      // single select
      if (!event.ctrlKey && !alreadySelected) this.$store.commit(`fm/${this.manager}/changeSelected`, { type, path });
    },

    /**
     * Show context menu
     * @param item
     * @param event
     */
    contextMenu(item, event) {
      // el type
      const type = item.type === 'dir' ? 'directories' : 'files';
      // search in selected array
      const alreadySelected = this.selected[type].includes(item.path);

      // select this element
      if (!alreadySelected) {
        // select item
        this.$store.commit(`fm/${this.manager}/changeSelected`, {
          type,
          path: item.path,
        });
      }

      // create event
      EventBus.$emit('contextMenu', event);
    },
  },
};
