<template>
    <div class="modal-content fm-modal-upload">
        <div class="modal-header">
            <h5 class="modal-title">{{ lang.modal.upload.title }}</h5>
            <button type="button" class="close" aria-label="Close" v-on:click="hideModal">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="fm-btn-wrapper" v-show="!progressBar">
                <button type="button" class="btn btn-secondary btn-block">
                    {{ lang.btn.uploadSelect }}
                </button>
                <input type="file" multiple name="myfile" v-on:change="selectFiles($event)">
            </div>
            <div class="fm-upload-list" v-if="countFiles">
                <div class="d-flex justify-content-between"
                     v-for="(item, index) in newFiles"
                     v-bind:key="index">
                    <div class="w-75 text-truncate">
                        <i class="far" v-bind:class="mimeToIcon(item.type)"/>
                        {{ item.name }}
                    </div>
                    <div class="text-right">
                        {{ bytesToHuman(item.size) }}
                    </div>
                </div>
                <hr>
                <div class="d-flex justify-content-between">
                    <div>
                        <strong>{{ lang.modal.upload.selected }}</strong>
                        {{ newFiles.length }}
                    </div>
                    <div class="text-right">
                        <strong>{{ lang.modal.upload.size }}</strong>
                        {{ allFilesSize }}
                    </div>
                </div>
                <hr>
                <div class="d-flex justify-content-between">
                    <div>
                        <strong>{{ lang.modal.upload.ifExist }}</strong>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input"
                               id="uploadRadio1"
                               type="radio"
                               name="uploadOptions"
                               value="0"
                               checked
                               v-model="overwrite">
                        <label class="form-check-label" for="uploadRadio1">
                            {{ lang.modal.upload.skip }}
                        </label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input"
                               id="uploadRadio2"
                               type="radio"
                               name="uploadOptions"
                               value="1"
                               checked
                               v-model="overwrite">
                        <label class="form-check-label" for="uploadRadio2">
                            {{ lang.modal.upload.overwrite }}
                        </label>
                    </div>
                </div>
                <hr>
            </div>
            <div v-else><p>{{ lang.modal.upload.noSelected }}</p></div>
            <div class="fm-upload-info">
                <!-- Progress Bar -->
                <div class="progress" v-show="countFiles">
                    <div class="progress-bar progress-bar-striped bg-info" role="progressbar"
                         v-bind:aria-valuenow="progressBar"
                         aria-valuemin="0"
                         aria-valuemax="100"
                         v-bind:style="{width: progressBar + '%' }">
                        {{ progressBar }}%
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn"
                    v-bind:class="[countFiles ? 'btn-info' : 'btn-light']"
                    v-bind:disabled="!countFiles"
                    v-on:click="uploadFiles">{{ lang.btn.submit }}
            </button>
            <button class="btn btn-light" v-on:click="hideModal()">{{ lang.btn.cancel }}</button>
        </div>
    </div>
</template>

<script>
import modal from '../mixins/modal';
import translate from '../../../mixins/translate';
import helper from '../../../mixins/helper';

export default {
  name: 'Upload',
  mixins: [modal, translate, helper],
  data() {
    return {
      // selected files
      newFiles: [],

      // overwrite if exists
      overwrite: 0,
    };
  },
  computed: {

    /**
     * Progress bar value - %
     * @returns {number}
     */
    progressBar() {
      return this.$store.state.fm.messages.actionProgress;
    },

    /**
     * Count of files selected for upload
     * @returns {number}
     */
    countFiles() {
      return this.newFiles.length;
    },

    /**
     * Calculate the size of all files
     * @returns {*|string}
     */
    allFilesSize() {
      let size = 0;

      for (let i = 0; i < this.newFiles.length; i += 1) {
        size += this.newFiles[i].size;
      }

      return this.bytesToHuman(size);
    },

  },
  methods: {
    /**
     * Select file or files
     * @param event
     */
    selectFiles(event) {
      // files selected?
      if (event.target.files.length === 0) {
        // no file selected
        this.newFiles = [];
      } else {
        // we have file or files
        this.newFiles = event.target.files;
      }
    },

    /**
     * Upload new files
     */
    uploadFiles() {
      // if files exists
      if (this.countFiles) {
        // upload files
        this.$store.dispatch('fm/upload', {
          files: this.newFiles,
          overwrite: this.overwrite,
        }).then((response) => {
          // if upload is successful
          if (response.data.result.status === 'success') {
            // close modal window
            this.hideModal();
          }
        });
      }
    },
  },
};
</script>

<style lang="scss">
    .fm-modal-upload {

        .fm-btn-wrapper {
            position: relative;
            overflow: hidden;
            padding-bottom: 6px;
            margin-bottom: 0.6rem;
        }

        .fm-btn-wrapper input[type=file] {
            font-size: 100px;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            cursor: pointer;
        }

        .fm-upload-list .far {
            padding-right: 0.5rem;
        }

        .fm-upload-list .form-check-inline {
            margin-right: 0;
        }

        .fm-upload-info > .progress {
            margin-bottom: 1rem;
        }
    }
</style>
