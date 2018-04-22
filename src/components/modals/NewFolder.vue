<template>
    <div class="modal-content fm-modal-folder">
        <div class="modal-header">
            <h5 class="modal-title">{{ lang.modal.newFolder.title }}</h5>
            <button type="button" class="close" aria-label="Close" v-on:click="hideModal">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label for="fm-folder-name">{{ lang.modal.newFolder.fieldName }}</label>
                <input type="text" class="form-control" id="fm-folder-name"
                       v-focus
                       v-bind:class="{'is-invalid': directoryExist}"
                       v-model="directoryName"
                       v-on:keyup="validateDirName">
                <div class="invalid-feedback" v-show="directoryExist">
                    {{ lang.modal.newFolder.fieldFeedback }}
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-info"
                    v-bind:disabled="!submitActive"
                    v-on:click="addFolder">{{ lang.btn.submit }}
            </button>
            <button class="btn btn-default" v-on:click="hideModal">{{ lang.btn.cancel }}</button>
        </div>
    </div>
</template>

<script>
import modalMixins from '../../mixins/modal';
import helper from '../../mixins/helper';

export default {
  name: 'NewFolder',
  mixins: [modalMixins, helper],
  data() {
    return {
      // name for new directory
      directoryName: '',

      // directory exist
      directoryExist: false,
    };
  },
  computed: {
    // submit button - active or no
    submitActive() {
      return this.directoryName && !this.directoryExist;
    },
  },
  methods: {
    // Check folder name, exist or no
    validateDirName() {
      if (this.directoryName) {
        this.directoryExist = this.$store.getters[`fm/${this.activeManager}/directoryExist`](this.directoryName);
      } else {
        this.directoryExist = false;
      }
    },

    // Create new directory
    addFolder() {
      this.$store.dispatch('fm/createDirectory', this.directoryName).then((response) => {
        // if new directory created successfully
        if (response.data.result.status === 'success') {
          // close modal window
          this.hideModal();
        }
      });
    },
  },
};
</script>
