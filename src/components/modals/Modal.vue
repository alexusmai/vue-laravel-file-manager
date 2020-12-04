<template>
    <transition name="fm-modal" appear>
        <div class="fm-modal" ref="fmModal" v-on:click="hideModal" v-if="showModal">
            <div class="modal-dialog"
                 role="document"
                 v-bind:class="modalSize"
                 v-on:click.stop>
                <component v-bind:is="modalName"/>
            </div>
        </div>
    </transition>
</template>

<script>
import NewFile from './views/NewFile.vue';
import NewFolder from './views/NewFolder.vue';
import Upload from './views/Upload.vue';
import Delete from './views/Delete.vue';
import Clipboard from './views/Clipboard.vue';
import Status from './views/Status.vue';
import Rename from './views/Rename.vue';
import Properties from './views/Properties.vue';
import Preview from './views/Preview.vue';
import TextEdit from './views/TextEdit.vue';
import AudioPlayer from './views/AudioPlayer.vue';
import VideoPlayer from './views/VideoPlayer.vue';
import Zip from './views/Zip.vue';
import Unzip from './views/Unzip.vue';
import About from './views/About.vue';

export default {
  name: 'Modal',
  components: {
    NewFile,
    NewFolder,
    Upload,
    Delete,
    Clipboard,
    Status,
    Rename,
    Properties,
    Preview,
    TextEdit,
    AudioPlayer,
    VideoPlayer,
    Zip,
    Unzip,
    About,
  },
  mounted() {
    // set height
    this.$store.commit('fm/modal/setModalBlockHeight', this.$refs.fmModal.offsetHeight);
  },
  computed: {
    /**
     * Selected modal name
     * @returns {null|*}
     */
    modalName() {
      return this.$store.state.fm.modal.modalName;
    },
    showModal() {
      return this.$store.state.fm.modal.showModal;
    },

    /**
     * Modal size style
     * @returns {{'modal-lg': boolean, 'modal-sm': boolean}}
     */
    modalSize() {
      return {
        'modal-xl': this.modalName === 'Preview' || this.modalName === 'TextEdit',
        'modal-lg': this.modalName === 'VideoPlayer',
        'modal-sm': false,
      };
    },
  },
  methods: {
    /**
     * Hide modal window
     */
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
        background-color:rgba(12,15, 33, 89%);
        display: block;
        opacity: auto;
        overflow: auto;
        transition: all .4s ease;
        .modal-xl {
            max-width: 96%;
        }
        .modal-content{
          transition: all .4s ease;
        }
        .close{
          outline: none;
        }
    }

    .fm-modal-enter-active, .fm-modal-leave-active {
        transition: all .4s ease;
        .modal-content{
          transition: all .4s ease;
        }
    }
    .fm-modal-enter, .fm-modal-leave-to {
        opacity: 0;
        .modal-content{
          transform: translateY(-2rem);
        }
    }
    .fm-modal-enter-to, .fm-modal-leave {
        opacity: 1;
        .modal-content{
          transform: translateY(0);
        }
    }
</style>
