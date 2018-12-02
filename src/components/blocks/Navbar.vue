<template>
    <div class="fm-navbar mb-3">
        <div class="row justify-content-between">
            <div class="col-auto">
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-secondary"
                            v-bind:disabled="backDisabled"
                            v-bind:title="lang.btn.back"
                            v-on:click="historyBack()">
                        <i class="fas fa-step-backward"></i>
                    </button>
                    <button type="button" class="btn btn-secondary"
                            v-bind:disabled="forwardDisabled"
                            v-bind:title="lang.btn.forward"
                            v-on:click="historyForward()">
                        <i class="fas fa-step-forward"></i>
                    </button>
                    <button type="button" class="btn btn-secondary"
                            v-on:click="refreshAll()"
                            v-bind:title="lang.btn.refresh">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-secondary"
                            v-on:click="showModal('NewFile')"
                            v-bind:title="lang.btn.file">
                        <i class="far fa-file"></i>
                    </button>
                    <button type="button" class="btn btn-secondary"
                            v-on:click="showModal('NewFolder')"
                            v-bind:title="lang.btn.folder">
                        <i class="far fa-folder"></i>
                    </button>
                    <button type="button" class="btn btn-secondary"
                            disabled
                            v-if="uploading"
                            v-bind:title="lang.btn.upload">
                        <i class="fas fa-download"></i>
                    </button>
                    <button type="button" class="btn btn-secondary"
                            v-else
                            v-on:click="showModal('Upload')"
                            v-bind:title="lang.btn.upload">
                        <i class="fas fa-download"></i>
                    </button>
                    <button type="button" class="btn btn-secondary"
                            v-on:click="showModal('Delete')"
                            v-bind:title="lang.btn.delete">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-secondary"
                            v-bind:title="lang.btn.copy"
                            v-on:click="toClipboard('copy')">
                        <i class="fas fa-copy"></i>
                    </button>
                    <button type="button" class="btn btn-secondary"
                            v-bind:title="lang.btn.cut"
                            v-on:click="toClipboard('cut')">
                        <i class="fas fa-cut"></i>
                    </button>
                    <button type="button" class="btn btn-secondary"
                            v-bind:disabled="!clipboardType"
                            v-bind:title="lang.btn.paste"
                            v-on:click="paste">
                        <i class="fas fa-paste"></i>
                    </button>
                </div>
            </div>
            <div class="col-auto text-right">
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-secondary"
                            v-bind:class="[viewType === 'table' ? 'active' : '']"
                            v-on:click="selectView('table')"
                            v-bind:title="lang.btn.table">
                        <i class="fas fa-th-list"></i>
                    </button>
                    <button role="button" class="btn btn-secondary"
                            v-bind:class="[viewType === 'grid' ? 'active' : '']"
                            v-on:click="selectView('grid')"
                            v-bind:title="lang.btn.grid">
                        <i class="fas fa-th"></i>
                    </button>
                </div>
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-secondary"
                            v-bind:title="lang.btn.fullScreen"
                            v-bind:class="{ active: fullScreen }"
                            v-on:click="screenToggle">
                        <i class="fas fa-expand-arrows-alt"></i>
                    </button>
                </div>
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-secondary"
                            v-bind:title="lang.btn.about"
                            v-on:click="showModal('About')">
                        <i class="fas fa-question"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import translate from './../../mixins/translate';

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
      return this.$store.state.fm[this.activeManager].historyPointer ===
          this.$store.state.fm[this.activeManager].history.length - 1;
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
    },

    /**
     * Paste
     */
    paste() {
      this.$store.dispatch('fm/paste');
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
