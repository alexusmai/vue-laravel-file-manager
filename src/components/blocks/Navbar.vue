<template>
    <div class="fm-navbar mb-3">
        <div class="row justify-content-between">
            <div class="col-auto">
                <div class="btn-group" role="group">
                    <v-btn type="button" class="btn btn-secondary"
                            v-bind:disabled="backDisabled"
                            v-bind:title="lang.btn.back"
                            v-on:click="historyBack()"
                            fab
                            tile
                            small
                            color="primary"
                            elevation="1"
                            >
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-btn type="button" class="btn btn-secondary"
                            v-bind:disabled="forwardDisabled"
                            v-bind:title="lang.btn.forward"
                            v-on:click="historyForward()"
                            fab
                            tile
                            small
                            color="primary"
                            elevation="1"
                            >
                        <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                    <v-btn type="button" class="btn btn-secondary"
                            v-on:click="refreshAll()"
                            v-bind:title="lang.btn.refresh"
                            fab
                            tile
                            small
                            color="primary"
                            elevation="1"
                            >
                        <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                </div>
                <div class="btn-group" role="group">
                    <v-btn type="button" class="btn btn-secondary"
                            v-on:click="showModal('NewFile')"
                            v-bind:title="lang.btn.file"
                            fab
                            tile
                            small
                            color="primary"
                            elevation="1"
                            >
                        <v-icon>mdi-file-outline</v-icon>
                    </v-btn>
                    <v-btn type="button" class="btn btn-secondary"
                            v-on:click="showModal('NewFolder')"
                            v-bind:title="lang.btn.folder"
                            fab
                            tile
                            small
                            color="primary"
                            elevation="1"
                            >
                        <v-icon>mdi-folder-outline</v-icon>
                    </v-btn>
                    <v-btn type="button" class="btn btn-secondary"
                            disabled
                            v-if="uploading"
                            v-bind:title="lang.btn.upload"
                            fab
                            tile
                            small
                            color="primary"
                            elevation="1"
                            >
                        <v-icon>mdi-upload-outline</v-icon>
                    </v-btn>
                    <v-btn type="button" class="btn btn-secondary"
                            v-else
                            v-on:click="showModal('Upload')"
                            v-bind:title="lang.btn.upload"
                            fab
                            tile
                            small
                            color="primary"
                            elevation="1"
                            >
                        <v-icon>mdi-upload-outline</v-icon>
                    </v-btn>
                    <v-btn type="button" class="btn btn-secondary"
                            v-bind:disabled="!isAnyItemSelected"
                            v-on:click="showModal('Delete')"
                            v-bind:title="lang.btn.delete"
                            fab
                            tile
                            small
                            color="primary"
                            elevation="1"
                            >
                        <v-icon>mdi-delete-outline</v-icon>
                    </v-btn>
                </div>
                <div class="btn-group" role="group">
                    <v-btn type="button" class="btn btn-secondary"
                            v-bind:disabled="!isAnyItemSelected"
                            v-bind:title="lang.btn.copy"
                            v-on:click="toClipboard('copy')"
                            fab
                            tile
                            small
                            color="primary"
                            elevation="1"
                            >
                        <v-icon>mdi-content-copy</v-icon>
                    </v-btn>
                    <v-btn type="button" class="btn btn-secondary"
                            v-bind:disabled="!isAnyItemSelected"
                            v-bind:title="lang.btn.cut"
                            v-on:click="toClipboard('cut')"
                            fab
                            tile
                            small
                            color="primary"
                            elevation="1"
                            >
                        <v-icon>mdi-content-cut</v-icon>
                    </v-btn>
                    <v-btn type="button" class="btn btn-secondary"
                            v-bind:disabled="!clipboardType"
                            v-bind:title="lang.btn.paste"
                            v-on:click="paste"
                            fab
                            tile
                            small
                            color="primary"
                            elevation="1"
                            >
                        <v-icon>mdi-content-paste</v-icon>
                    </v-btn>
                </div>
                <!-- <div class="btn-group" role="group">
                    <button type="button" class="btn btn-secondary"
                            v-bind:title="lang.btn.hidden"
                            v-on:click="toggleHidden">
                        <i class="fas" v-bind:class="[hiddenFiles ? 'fa-eye': 'fa-eye-slash']"/>
                    </button>
                </div> -->
            </div>
            <div class="col-auto text-right">
                <div class="btn-group" role="group">
                    <v-btn type="button" class="btn btn-secondary"
                            v-bind:class="[viewType === 'table' ? 'active' : '']"
                            v-on:click="selectView('table')"
                            v-bind:title="lang.btn.table"
                            fab
                            tile
                            small
                            color="primary"
                            elevation="1"
                            >
                        <v-icon>mdi-format-list-bulleted</v-icon>
                    </v-btn>
                    <v-btn role="button" class="btn btn-secondary"
                            v-bind:class="[viewType === 'grid' ? 'active' : '']"
                            v-on:click="selectView('grid')"
                            v-bind:title="lang.btn.grid"
                            fab
                            tile
                            small
                            color="primary"
                            elevation="1"
                            >
                        <v-icon>mdi-view-grid-outline</v-icon>
                    </v-btn>
                </div>
                <div class="btn-group" role="group">
                    <v-btn type="button" class="btn btn-secondary"
                            v-bind:title="lang.btn.fullScreen"
                            v-bind:class="{ active: fullScreen }"
                            v-on:click="screenToggle"
                            fab
                            tile
                            small
                            color="primary"
                            elevation="1"
                            >
                        <v-icon>mdi-fullscreen</v-icon>
                    </v-btn>
                </div>
                <!-- <div class="btn-group" role="group">
                    <v-btn type="button" class="btn btn-secondary"
                            v-bind:title="lang.btn.about"
                            v-on:click="showModal('About')"
                            fab
                            tile
                            small
                            color="primary"
                            elevation="1"
                            >
                        <v-icon>mdi-help-circle-outline</v-icon>
                    </v-btn>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import translate from '../../mixins/translate';
import EventBus from '../../eventBus';

export default {
  mixins: [translate],
  computed: {
    /**
     * Active manager name
     * @returns {default.computed.activeManager|(function())|string|activeManager}
     */
    activeManager() {
      return this.$store.state.fm.activeManager;
    },

    /**
     * Back button state
     * @returns {boolean}
     */
    backDisabled() {
      return !this.$store.state.fm[this.activeManager].historyPointer;
    },

    /**
     * Forward button state
     * @returns {boolean}
     */
    forwardDisabled() {
      return this.$store.state.fm[this.activeManager].historyPointer
          === this.$store.state.fm[this.activeManager].history.length - 1;
    },

    /**
     * Is any files or directories selected?
     * @returns {boolean}
     */
    isAnyItemSelected() {
      return this.$store.state.fm[this.activeManager].selected.files.length > 0
          || this.$store.state.fm[this.activeManager].selected.directories.length > 0;
    },

    /**
     * Manager view type - grid or table
     * @returns {default.computed.viewType|(function())|string}
     */
    viewType() {
      return this.$store.state.fm[this.activeManager].viewType;
    },

    /**
     * Upload files
     * @returns {boolean}
     */
    uploading() {
      return this.$store.state.fm.messages.actionProgress > 0;
    },

    /**
     * Clipboard - action type
     * @returns {null}
     */
    clipboardType() {
      return this.$store.state.fm.clipboard.type;
    },

    /**
     * Full screen status
     * @returns {default.computed.fullScreen|(function())|boolean|fullScreen|*|string}
     */
    fullScreen() {
      return this.$store.state.fm.fullScreen;
    },

    /**
     * Show or Hide hidden files
     * @returns {boolean}
     */
    hiddenFiles() {
      return this.$store.state.fm.settings.hiddenFiles;
    },
  },
  methods: {
    /**
     * Refresh file manager
     */
    refreshAll() {
      this.$store.dispatch('fm/refreshAll');
    },

    /**
     * History back
     */
    historyBack() {
      this.$store.dispatch(`fm/${this.activeManager}/historyBack`);
    },

    /**
     * History forward
     */
    historyForward() {
      this.$store.dispatch(`fm/${this.activeManager}/historyForward`);
    },

    /**
     * Copy
     * @param type
     */
    toClipboard(type) {
      this.$store.dispatch('fm/toClipboard', type);

      // show notification
      if (type === 'cut') {
        EventBus.$emit('addNotification', {
          status: 'success',
          message: this.lang.notifications.cutToClipboard,
        });
      } else if (type === 'copy') {
        EventBus.$emit('addNotification', {
          status: 'success',
          message: this.lang.notifications.copyToClipboard,
        });
      }
    },

    /**
     * Paste
     */
    paste() {
      this.$store.dispatch('fm/paste');
    },

    /**
     * Set Hide or Show hidden files
     */
    toggleHidden() {
      this.$store.commit('fm/settings/toggleHiddenFiles');
    },

    /**
     * Show modal window
     * @param modalName
     */
    showModal(modalName) {
      // show selected modal
      this.$store.commit('fm/modal/setModalState', {
        modalName,
        show: true,
      });
    },

    /**
     * Select view type
     * @param type
     */
    selectView(type) {
      if (this.viewType !== type) this.$store.commit(`fm/${this.activeManager}/setView`, type);
    },

    /**
     * Full screen toggle
     */
    screenToggle() {
      const fm = document.getElementsByClassName('fm')[0];

      if (!this.fullScreen) {
        if (fm.requestFullscreen) {
          fm.requestFullscreen();
        } else if (fm.mozRequestFullScreen) {
          fm.mozRequestFullScreen();
        } else if (fm.webkitRequestFullscreen) {
          fm.webkitRequestFullscreen();
        } else if (fm.msRequestFullscreen) {
          fm.msRequestFullscreen();
        }
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }

      this.$store.commit('fm/screenToggle');
    },
  },
};
</script>

<style lang="scss">
    .fm-navbar {

        .btn-group {
            margin-right: 0.4rem;
        }
    }
</style>
