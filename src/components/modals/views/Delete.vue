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
                <div class="d-flex justify-content-between"
                     v-for="(item, index) in selectedItems"
                     v-bind:key="index">
                    <div class="w-75 text-truncate">
                        <span v-if="item.type === 'dir'">
                            <i class="far fa-folder"></i>{{ item.basename }}
                        </span>
                        <span v-else>
                            <i class="far" v-bind:class="extensionToIcon(item.extension)">
                            </i> {{ item.basename }}
                        </span>
                    </div>
                    <div class="text-right" v-if="item.type === 'file'">
                        {{ bytesToHuman(item.size) }}
                    </div>
                </div>
            </div>
            <div v-else>
                <span class="text-danger">{{ lang.modal.delete.noSelected }}</span>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-danger" v-on:click="deleteItems">{{ lang.modal.delete.title }}
            </button>
            <button class="btn btn-default" v-on:click="hideModal">{{ lang.btn.cancel }}</button>
        </div>
    </div>
</template>

<script>
import modal from './../../../mixins/modal';
import translate from './../../../mixins/translate';
import helper from './../../../mixins/helper';

export default {
  name: 'Delete',
  mixins: [modal, translate, helper],
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
      const items = this.selectedItems.map(item => ({
        path: item.path,
        type: item.type,
      }));

      this.$store.dispatch('fm/delete', items).then((response) => {
        // if deleted - hide modal
        if (response.data.result.status === 'success') {
          // close modal window
          this.hideModal();
        }
      });
    },
  },
};
</script>

<style lang="scss">
    .fm-modal-delete {

        .modal-body .far {
            padding-right: 0.5rem;
        }

        .d-flex label {
            margin-bottom: 0;
        }
    }
</style>
