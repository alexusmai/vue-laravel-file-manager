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
                <cropper-module v-bind:imgUrl="imgUrl"
                                v-bind:maxHeight="maxHeight"
                                v-on:closeCropper="showCropperModule = false"></cropper-module>
            </template>
            <template v-else>
                <img v-bind:src="imgUrl"
                     v-bind:alt="selectedItem.basename"
                     v-bind:style="{'max-height': maxHeight+'px'}">
            </template>
        </div>
        <div v-if="showFooter" class="d-flex justify-content-between">
            <span class="d-block">
                <button class="btn btn-info"
                        v-bind:title="lang.modal.cropper.title" v-on:click="showCropperModule = true">
                    <i class="fas fa-crop-alt"></i>
                </button>
            </span>
            <span class="d-block">
                <button class="btn btn-default" v-on:click="hideModal">{{ lang.btn.cancel }}</button>
            </span>
        </div>
    </div>
</template>

<script>
import CropperModule from './../additions/Cropper.vue';
import modal from './../../../mixins/modal';
import translate from './../../../mixins/translate';
import helper from './../../../mixins/helper';
import { apiURL } from '../../../http/helper';

export default {
  name: 'Preview',
  mixins: [modal, translate, helper],
  components: { CropperModule },
  data() {
    return {
      showCropperModule: false,
      imgUrl: '',
    };
  },
  created() {
    // Create image URL
    this.imgUrl = `${apiURL()}preview?disk=${this.selectedDisk}&path=${encodeURIComponent(this.selectedItem.path)}`;
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
     * Selected file
     * @returns {*}
     */
    selectedItem() {
      return this.$store.getters['fm/selectedItems'][0];
    },

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
  },
};
</script>

<style lang="scss">
    .fm-modal-preview {

        .modal-body {
            padding: 0;

            img {
            }
        }

        .d-flex {
            padding: 1rem;
            border-top: 1px solid #e9ecef;
        }
    }
</style>
