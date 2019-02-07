<template>
    <div class="modal-content fm-modal-properties">
        <div class="modal-header">
            <h5 class="modal-title">{{ lang.modal.properties.title }}</h5>
            <button type="button" class="close" aria-label="Close" v-on:click="hideModal">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <dl class="row">
                <dt class="col-3">{{ lang.modal.properties.disk }}:</dt>
                <dd class="col-9">{{ selectedDisk }}</dd>

                <dt class="col-3">{{ lang.modal.properties.name }}:</dt>
                <dd class="col-9">{{ selectedItem.basename }}</dd>

                <dt class="col-3">{{ lang.modal.properties.path }}:</dt>
                <dd class="col-9">{{ selectedItem.path }}</dd>

                <template v-if="selectedItem.type === 'file'">
                    <dt class="col-3">{{ lang.modal.properties.size }}:</dt>
                    <dd class="col-9">{{ bytesToHuman(selectedItem.size) }}</dd>
                </template>

                <template v-if="selectedItem.hasOwnProperty('timestamp')">
                    <dt class="col-3">{{ lang.modal.properties.modified }}:</dt>
                    <dd class="col-9">{{ timestampToDate(selectedItem.timestamp) }}</dd>
                </template>

                <template v-if="selectedItem.hasOwnProperty('acl')">
                    <dt class="col-3">{{ lang.modal.properties.access }}:</dt>
                    <dd class="col-9">{{ lang.modal.properties['access_' + selectedItem.acl] }}</dd>
                </template>
            </dl>
        </div>
    </div>
</template>

<script>
import modal from './../mixins/modal';
import translate from './../../../mixins/translate';
import helper from './../../../mixins/helper';

export default {
  name: 'Properties',
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
};
</script>
