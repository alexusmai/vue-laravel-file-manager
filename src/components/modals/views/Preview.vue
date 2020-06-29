<template>
    <div class="modal-content fm-modal-preview">
        <div class="modal-header">
            <h5 class="modal-title w-75 text-truncate">
                {{ showCropperModule ? lang.modal.cropper.title : lang.modal.preview.title }}
                <small class="text-muted pl-3">{{ selectedItem.basename }}</small>
            </h5>
            <button type="button" class="close" aria-label="Close" v-on:click="hideModal">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body text-center">
            <template v-if="showCropperModule">
                <cropper-module v-bind:imgSrc="imgSrc"
                                v-bind:maxHeight="maxHeight"
                                v-on:closeCropper="closeCropper"/>
            </template>
            <transition v-else name="fade" mode="out-in">
                <i v-if="!imgSrc" class="fas fa-spinner fa-spin fa-5x p-5 text-muted"/>
                <img v-else
                     v-bind:src="imgSrc"
                     v-bind:alt="selectedItem.basename"
                     v-bind:style="{'max-height': maxHeight+'px'}">
            </transition>
        </div>
        <div v-if="showFooter" class="d-flex justify-content-between">
            <span class="d-block">
                <button class="btn btn-info"
                        v-bind:title="lang.modal.cropper.title" v-on:click="showCropperModule = true">
                    <i class="fas fa-crop-alt"/>
                </button>
            </span>
            <span class="d-block">
                <button class="btn btn-light" v-on:click="hideModal">{{ lang.btn.cancel }}</button>
            </span>
        </div>
    </div>
</template>

<script>
import CropperModule from '../additions/Cropper.vue';
import modal from '../mixins/modal';
import translate from '../../../mixins/translate';
import helper from '../../../mixins/helper';
import GET from '../../../http/get';

export default {
  name: 'Preview',
  mixins: [modal, translate, helper],
  components: { CropperModule },
  data() {
    return {
      showCropperModule: false,
      imgSrc: '',
    };
  },
  created() {
    this.loadImage();
  },
  computed: {
    /**
     * Authorization required
     * @return {*}
     */
    auth() {
      return this.$store.getters['fm/settings/authHeader'];
    },

    /**
     * Selected disk
     * @returns {*}
     */
    selectedDisk() {
      return this.$store.getters['fm/selectedDisk'];
    },

    /**
     * Selected file
     * @returns {*}
     */
    selectedItem() {
      return this.$store.getters['fm/selectedItems'][0];
    },

    /**
     * Show modal footer
     * @return boolean
     */
    showFooter() {
      return this.canCrop(this.selectedItem.extension) && !this.showCropperModule;
    },

    /**
     * Calculate the max height for image
     * @returns {number}
     */
    maxHeight() {
      if (this.$store.state.fm.modal.modalBlockHeight) {
        return this.$store.state.fm.modal.modalBlockHeight - 170;
      }

      return 300;
    },
  },
  methods: {
    /**
     * Can we crop this image?
     * @param extension
     * @returns {boolean}
     */
    canCrop(extension) {
      return this.$store.state.fm.settings.cropExtensions.includes(extension.toLowerCase());
    },

    /**
     * Close cropper
     */
    closeCropper() {
      this.showCropperModule = false;
      this.loadImage();
    },

    /**
     * Load image
     */
    loadImage() {
      // if authorization required
      if (this.auth) {
        GET.preview(
          this.selectedDisk,
          this.selectedItem.path,
        ).then((response) => {
          const mimeType = response.headers['content-type'].toLowerCase();
          const imgBase64 = Buffer.from(response.data, 'binary').toString('base64');

          this.imgSrc = `data:${mimeType};base64,${imgBase64}`;
        });
      } else {
        this.imgSrc = `${this.$store.getters['fm/settings/baseUrl']}preview?disk=${this.selectedDisk}&path=${encodeURIComponent(this.selectedItem.path)}&v=${this.selectedItem.timestamp}`;
      }
    },
  },
};
</script>

<style lang="scss">
    .fm-modal-preview {

        .modal-body {
            padding: 0;

            img {
                max-width: 100%;
            }
        }

        & > .d-flex {
            padding: 1rem;
            border-top: 1px solid #e9ecef;
        }
    }
</style>
