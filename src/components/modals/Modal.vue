<template>
    <transition name="fm-modal">
        <div class="fm-modal" v-on:click="hideModal">
            <div class="modal-dialog modal-dialog-centered"
                 role="document"
                 v-bind:class="modalSize"
                 v-on:click.stop>
                <component v-bind:is="modalName"></component>
            </div>
        </div>
    </transition>
</template>

<script>
import NewFolder from './NewFolder';
import Upload from './Upload';
import Delete from './Delete';
import Clipboard from './Clipboard';
import Status from './Status';
import Rename from './Rename';
import Properties from './Properties';
import Preview from './Preview';
import About from './About';

export default {
  name: 'Modal',
  components: {
    NewFolder,
    Upload,
    Delete,
    Clipboard,
    Status,
    Rename,
    Properties,
    Preview,
    About,
  },
  computed: {
    /**
     * Selected modal name
     * @returns {null|*}
     */
    modalName() {
      return this.$store.state.fm.modal.modalName;
    },

    // Modal size style
    modalSize() {
      return {
        'modal-lg': this.modalName === 'Preview',
        'modal-sm': false,
      };
    },
  },
  methods: {
    // Hide modal window
    hideModal() {
      this.$store.commit('fm/modal/clearModal');
    },
  },
};
</script>

<style lang="scss">

    .fm-modal {
        position: absolute;
        z-index: 9998;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .35);
        display: block;
        transition: opacity .4s ease;
        overflow: auto;
    }

    .fm-modal-enter-active, .fm-modal-leave-active {
        transition: opacity .5s;
    }
    .fm-modal-enter, .fm-modal-leave-to {
        opacity: 0;
    }
</style>
