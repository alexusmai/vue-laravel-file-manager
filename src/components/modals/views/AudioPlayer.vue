<template>
    <div class="modal-content fm-modal-audio-player">
        <div class="modal-header">
            <h5 class="modal-title">
                {{ lang.modal.audioPlayer.title }}
            </h5>
            <button type="button" class="close" aria-label="Close" v-on:click="hideModal">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <audio ref="fmAudio" controls/>
            <hr>
            <div class="d-flex justify-content-between py-2 px-2"
                 v-bind:class="playingIndex === index ? 'bg-light' : ''"
                 v-for="(item, index) in audioFiles"
                 v-bind:key="index">
                <div class="w-75 text-truncate">
                    <span class="text-muted pr-2">{{ index }}.</span>
                    {{ item.basename }}
                </div>
                <template v-if="playingIndex === index">
                    <div v-if="status === 'playing'">
                        <i v-on:click="togglePlay()" class="fas fa-play active"/>
                    </div>
                    <div v-else>
                        <i v-on:click="togglePlay()" class="fas fa-pause"/>
                    </div>
                </template>
                <template v-else>
                    <div>
                        <i v-on:click="selectTrack(index)" class="fas fa-play"/>
                    </div>
                </template>
            </div>
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
      playingIndex: 0,
      status: 'paused',
    };
  },
  mounted() {
    // initiate player
    this.player = new Plyr(this.$refs.fmAudio, {
      speed: {
        selected: 1,
        options: [0.5, 1, 1.5],
      },
    });

    // select first item in the list
    this.setSource(this.playingIndex);

    // add event listeners
    this.player.on('play', () => {
      this.status = 'playing';
    });

    this.player.on('pause', () => {
      this.status = 'paused';
    });

    this.player.on('ended', () => {
      if (this.audioFiles.length > this.playingIndex + 1) {
        // play next track
        this.selectTrack(this.playingIndex + 1);
      }
    });
  },
  beforeDestroy() {
    // destroy player
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
     * Audio files list
     * @returns {*}
     */
    audioFiles() {
      return this.$store.getters['fm/selectedItems'];
    },
  },
  methods: {
    /**
     * Select another audio track
     * @param index
     */
    selectTrack(index) {
      if (this.player.playing) {
        // stop playing
        this.player.stop();
      }
      // load new source
      this.setSource(index);
      // start play
      this.player.play();

      this.playingIndex = index;
    },

    /**
     * Set source to audio player
     * @param index
     */
    setSource(index) {
      this.player.source = {
        type: 'audio',
        title: this.audioFiles[index].filename,
        sources: [{
          src: `${this.$store.getters['fm/settings/baseUrl']}stream-file?disk=${this.selectedDisk}&path=${encodeURIComponent(this.audioFiles[index].path)}`,
          type: `audio/${this.audioFiles[index].extension}`,
        }],
      };
    },

    /**
     * Play/Pause
     */
    togglePlay() {
      this.player.togglePlay();
    },
  },
};
</script>

<style lang="scss">
    .fm-modal-audio-player {
        .fas.fa-play {
            color: gray;
            opacity: 0.1;
            cursor: pointer;

            &:hover {
                opacity: 0.5;
            }

            &.active {
                opacity: 1;
                color: deepskyblue;
            }
        }

        .fas.fa-pause {
            color: gray;
            opacity: 0.5;
            cursor: pointer;
        }
    }
</style>
