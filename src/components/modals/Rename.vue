<template>
    <div class="modal-content fm-modal-rename">
        <div class="modal-header">
            <h5 class="modal-title">{{ lang.modal.rename.title }}</h5>
            <button type="button" class="close" aria-label="Close" v-on:click="hideModal">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label for="fm-input-rename">{{ lang.modal.rename.fieldName }}</label>
                <input type="text" class="form-control" id="fm-input-rename"
                       v-focus
                       v-bind:class="{'is-invalid': feedback}"
                       v-model="name"
                       v-on:keyup="validateName">
                <div class="invalid-feedback" v-show="feedback">
                    {{ lang.modal.rename.fieldFeedback }}
                    {{ directoryExist ? ` - ${lang.modal.rename.directoryExist}` : ''}}
                    {{ fileExist ? ` - ${lang.modal.rename.fileExist}` : ''}}
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-info"
                    v-bind:disabled="submitDisable"
                    v-on:click="rename">{{ lang.btn.submit }}
            </button>
            <button class="btn btn-default" v-on:click="hideModal">{{ lang.btn.cancel }}</button>
        </div>
    </div>
</template>

<script>
import modal from '../../mixins/modal';
import helper from '../../mixins/helper';

export default {
  name: 'Rename',
  mixins: [modal, helper],
  data() {
    return {
      name: '',
      directoryExist: false,
      fileExist: false,
    };
  },
  computed: {
    // Selected files and folders
    selectedItem() {
      return this.$store.getters[`fm/${this.activeManager}/selectedList`][0];
    },

    // new name is invalid if
    feedback() {
      return this.directoryExist || this.fileExist || !this.name;
    },

    // submit button disable
    submitDisable() {
      return this.directoryExist ||
        this.fileExist ||
        !this.name ||
        this.name === this.selectedItem.basename;
    },
  },
  mounted() {
    this.name = this.selectedItem.basename;
  },
  methods: {
    // Check name, exist or no
    validateName() {
      if (this.name !== this.selectedItem.basename) {
        // if item - folder
        if (this.selectedItem.type === 'dir') {
          // check folder name matches
          this.directoryExist = this.$store.getters[`fm/${this.activeManager}/directoryExist`](this.name);
        } else {
          // check file name matches
          this.fileExist = this.$store.getters[`fm/${this.activeManager}/fileExist`](this.name);
        }
      }
    },

    // rename item
    rename() {
      const newName = this.selectedItem.dirname ? `${this.selectedItem.dirname}/${this.name}` : this.name;
      this.$store.dispatch('fm/rename', {
        type: this.selectedItem.type,
        newName,
        oldName: this.selectedItem.path,
      }).then(() => {
        // close modal window
        this.hideModal();
      });
    },
  },
};
</script>
