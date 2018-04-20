<template>
    <div class="modal-content fm-modal-preview">
        <div class="modal-header">
            <h5 class="modal-title">
                <i class="far fa-file-image"></i>
                {{ `${selectedItem.basename} - ${bytesToHuman(selectedItem.size)}` }}
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
import modal from '../../mixins/modal';
import helper from '../../mixins/helper';

export default {
  name: 'Preview',
  mixins: [modal, helper],
  computed: {
    // selected disk
    selectedDisk() {
      return this.$store.getters['fm/selectedDisk'];
    },

    // selected file
    selectedItem() {
      return this.$store.getters['fm/selectedItems'][0];
    },
  },
  methods: {
    createImgUrl() {
      return `${location.protocol}//${location.hostname}/file-manager/preview?disk=${this.selectedDisk}&path=${this.selectedItem.path}`;
    },
  },
};
</script>
