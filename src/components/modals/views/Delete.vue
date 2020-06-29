<template>
    <div class="modal-content fm-modal-delete">
        <div class="modal-header">
            <h5 class="modal-title">{{ lang.modal.delete.title }}</h5>
            <button type="button" class="close" aria-label="Close" v-on:click="hideModal">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div v-if="selectedItems.length">
                <selected-file-list/>
            </div>
            <div v-else>
                <span class="text-danger">{{ lang.modal.delete.noSelected }}</span>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-danger" v-on:click="deleteItems">{{ lang.modal.delete.title }}
            </button>
            <button class="btn btn-light" v-on:click="hideModal">{{ lang.btn.cancel }}</button>
        </div>
    </div>
</template>

<script>
import SelectedFileList from '../additions/SelectedFileList.vue';
import modal from '../mixins/modal';
import translate from '../../../mixins/translate';

export default {
  name: 'Delete',
  mixins: [modal, translate],
  components: { SelectedFileList },
  computed: {
    /**
     * Files and folders for deleting
     * @returns {*}
     */
    selectedItems() {
      return this.$store.getters['fm/selectedItems'];
    },
  },
  methods: {
    /**
     * Delete selected directories and files
     */
    deleteItems() {
      // create items list for delete
      const items = this.selectedItems.map((item) => ({
        path: item.path,
        type: item.type,
      }));

      this.$store.dispatch('fm/delete', items).then(() => {
        // close modal window
        this.hideModal();
      });
    },
  },
};
</script>
