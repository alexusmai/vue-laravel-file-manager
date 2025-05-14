<template>
    <div class="modal-content fm-modal-remote-upload">
        <div class="modal-header">
            <h5 class="modal-title">{{ lang.modal.remoteUpload.title }}</h5>
            <button type="button" class="btn-close" aria-label="Close" v-on:click="hideModal"></button>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label for="remoteUrl">{{ lang.modal.remoteUpload.urlLabel }}</label>
                <input
                    type="url"
                    class="form-control"
                    id="remoteUrl"
                    v-model="url"
                    :placeholder="lang.modal.remoteUpload.urlPlaceholder"
                />
            </div>
            <div class="d-flex justify-content-between mt-3" v-if="url">
                <div>
                    <strong>{{ lang.modal.upload.ifExist }}</strong>
                </div>
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        id="uploadRadio1"
                        type="radio"
                        name="uploadOptions"
                        v-bind:checked="!overwrite"
                        v-on:change="overwrite = 0"
                    />
                    <label class="form-check-label" for="uploadRadio1">
                        {{ lang.modal.upload.skip }}
                    </label>
                </div>
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        id="uploadRadio2"
                        type="radio"
                        name="uploadOptions"
                        v-bind:checked="overwrite"
                        v-on:change="overwrite = 1"
                    />
                    <label class="form-check-label" for="uploadRadio2">
                        {{ lang.modal.upload.overwrite }}
                    </label>
                </div>
            </div>
            <div class="fm-upload-info mt-3">
                <!-- Progress Bar -->
                <div class="progress" v-show="progressBar > 0">
                    <div
                        class="progress-bar progress-bar-striped bg-info"
                        role="progressbar"
                        v-bind:aria-valuenow="progressBar"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        v-bind:style="{ width: progressBar + '%' }"
                    >
                        {{ progressBar }}%
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button
                type="button"
                class="btn"
                v-bind:class="[url ? 'btn-info' : 'btn-light']"
                v-bind:disabled="!url"
                v-on:click="uploadFromUrl"
            >
                {{ lang.btn.submit }}
            </button>
            <button type="button" class="btn btn-light" v-on:click="hideModal()">{{ lang.btn.cancel }}</button>
        </div>
    </div>
</template>

<script>
import modal from '../mixins/modal';
import translate from '../../../mixins/translate';
import helper from '../../../mixins/helper';

export default {
    name: 'RemoteUploadModal',
    mixins: [modal, translate, helper],
    data() {
        return {
            url: '',
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
    },
    methods: {
        /**
         * Upload file from URL
         */
        uploadFromUrl() {
            if (this.url) {
                this.$store
                    .dispatch('fm/uploadByUrl', {
                        url: this.url,
                        overwrite: this.overwrite,
                    })
                    .then((response) => {
                        if (response.data.result.status === 'success') {
                            this.hideModal();
                        }
                    });
            }
        },
    },
};
</script>

<style lang="scss">
.fm-modal-remote-upload {
    .form-check-inline {
        margin-right: 0;
    }

    .fm-upload-info > .progress {
        margin-bottom: 1rem;
    }
}
</style>
