<template>
    <div class="modal-content fm-modal-preview">
        <div class="modal-header">
            <h5 class="modal-title w-75 text-truncate">
                {{ lang.modal.preview.title }} <small class="text-muted pl-3">{{ selectedItem.basename }}</small>
            </h5>
            <button type="button" class="close" aria-label="Close" v-on:click="hideModal">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body text-center">
            <img v-bind:src="createImgUrl()" class="img-fluid" v-bind:alt="selectedItem.basename">
        </div>
    </div>
</template>

<script>
import modal from './../../../mixins/modal';
import translate from './../../../mixins/translate';
import helper from './../../../mixins/helper';
import { apiURL } from '../../../http/helper';

export default {
  name: 'Preview',
  mixins: [modal, translate, helper],
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
  },
  methods: {
    /**
     * Create image URL
     * @returns {string}
     */
    createImgUrl() {
      return `${apiURL()}preview?disk=${this.selectedDisk}&path=${encodeURIComponent(this.selectedItem.path)}`;
    },
  },
};
</script>
