<template>
    <div class="modal-content fm-modal-unzip">
        <div class="modal-header">
            <h5 class="modal-title">{{ lang.modal.unzip.title }}</h5>
            <button type="button" class="btn-close" aria-label="Close" v-on:click="hideModal"></button>
        </div>
        <div class="modal-body">
            <div class="d-flex justify-content-between">
                <div>
                    <strong>{{ lang.modal.unzip.fieldRadioName }}</strong>
                </div>
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        id="unzipRadio1"
                        type="radio"
                        v-bind:checked="!createFolder"
                        v-on:change="createFolder = false"
                    />
                    <label class="form-check-label" for="unzipRadio1">
                        {{ lang.modal.unzip.fieldRadio1 }}
                    </label>
                </div>
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        id="unzipRadio2"
                        type="radio"
                        v-bind:checked="createFolder"
                        v-on:change="createFolder = true"
                    />
                    <label class="form-check-label" for="unzipRadio2">
                        {{ lang.modal.unzip.fieldRadio2 }}
                    </label>
                </div>
            </div>
            <hr />
            <div v-if="createFolder" class="form-group">
                <label for="fm-folder-name">{{ lang.modal.unzip.fieldName }}</label>
                <input
                    type="text"
                    class="form-control"
                    id="fm-folder-name"
                    v-focus
                    v-bind:class="{ 'is-invalid': directoryExist }"
                    v-model="directoryName"
                    v-on:keyup="validateDirName"
                />
                <div class="invalid-feedback" v-show="directoryExist">
                    {{ lang.modal.unzip.fieldFeedback }}
                </div>
            </div>
            <span v-else class="text-danger">{{ lang.modal.unzip.warning }}</span>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-info" v-bind:disabled="!submitActive" v-on:click="unpackArchive">
                {{ lang.btn.submit }}
            </button>
            <button type="button" class="btn btn-light" v-on:click="hideModal">{{ lang.btn.cancel }}</button>
        </div>
    </div>
</template>

<script>
import modal from '../mixins/modal';
import translate from '../../../mixins/translate';

export default {
    name: 'UnzipModal',
    mixins: [modal, translate],
    data() {
        return {
            createFolder: false,
            directoryName: '',
            directoryExist: false,
        };
    },
    computed: {
        /**
         * Submit button - active or no
         * @returns {string|boolean}
         */
        submitActive() {
            if (this.createFolder) {
                return this.directoryName && !this.directoryExist;
            }

            return true;
        },
    },
    methods: {
        /**
         * Check the folder name if it exists or not.
         */
        validateDirName() {
            if (this.directoryName) {
                this.directoryExist = this.$store.getters[`fm/${this.activeManager}/directoryExist`](
                    this.directoryName
                );
            } else {
                this.directoryExist = false;
            }
        },

        /**
         * Unpack selected archive
         */
        unpackArchive() {
            this.$store.dispatch('fm/unzip', this.createFolder ? this.directoryName : null).then(() => {
                this.hideModal();
            });
        },
    },
};
</script>
