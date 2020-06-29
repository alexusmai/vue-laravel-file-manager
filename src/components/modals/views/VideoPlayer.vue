<template>
    <div class="modal-content fm-modal-video-player">
        <div class="modal-header">
            <h5 class="modal-title w-75 text-truncate">
                {{ lang.modal.videoPlayer.title }} <small class="text-muted pl-3">{{ videoFile.basename }}</small>
            </h5>
            <button type="button" class="close" aria-label="Close" v-on:click="hideModal">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <video ref="fmVideo" controls/>
        </div>
    </div>
</template>

<script>
import Plyr from 'plyr';
import modal from '../mixins/modal';
import translate from '../../../mixins/translate';

export default {
  name: 'Player',
  mixins: [modal, translate],
  data() {
    return {
      player: {},
    };
  },
  mounted() {
    // initiate video player
    this.player = new Plyr(this.$refs.fmVideo);
    // load source
    this.player.source = {
      type: 'video',
      title: this.videoFile.filename,
      sources: [{
        src: `${this.$store.getters['fm/settings/baseUrl']}stream-file?disk=${this.selectedDisk}&path=${encodeURIComponent(this.videoFile.path)}`,
        type: `audio/${this.videoFile.extension}`,
      }],
    };
  },
  beforeDestroy() {
    this.player.destroy();
  },
  computed: {
    /**
     * Selected disk
     * @returns {*}
     */
    selectedDisk() {
      return this.$store.getters['fm/selectedDisk'];
    },

    /**
     * Video file
     * @returns {*}
     */
    videoFile() {
      return this.$store.getters['fm/selectedItems'][0];
    },
  },
  methods: {
  },
};
</script>

<style lang="scss">
    .fm-modal-video-player {

    }
</style>
