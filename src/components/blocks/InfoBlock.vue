<template>
    <div class="fm-info-block d-flex justify-content-between">
        <div class="col-auto">
            <span v-show="selectedCount">
                {{ `${lang.info.selected} ${selectedCount}` }}
                {{ `${lang.info.selectedSize} ${selectedFilesSize}` }}
            </span>
            <span v-show="!selectedCount">
                {{ `${lang.info.directories} ${directoriesCount}` }}
                {{ `${lang.info.files} ${filesCount}` }}
                {{ `${lang.info.size} ${filesSize}` }}
            </span>
        </div>
        <div class="col-4">
            <!-- Progress Bar -->
            <div class="progress" v-show="progressBar">
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
        <div class="col-auto text-right">
            <div class="spinner-border spinner-border-sm text-info" role="status" v-show="loadingSpinner">
                <span class="visually-hidden">Loading...</span>
            </div>
            <span
                v-show="clipboardType"
                v-on:click="showModal('ClipboardModal')"
                v-bind:title="[lang.clipboard.title + ' - ' + lang.clipboard[clipboardType]]"
            >
                <i class="bi bi-clipboard"></i>
            </span>
            <span
                v-on:click="showModal('StatusModal')"
                v-bind:class="[hasErrors ? 'text-danger' : 'text-success']"
                v-bind:title="lang.modal.status.title"
            >
                <i class="bi bi-info-circle-fill"></i>
            </span>
        </div>
    </div>
</template>

<script>
import translate from '../../mixins/translate';
import helper from '../../mixins/helper';

export default {
    name: 'InfoBlock',
    mixins: [translate, helper],
    computed: {
        /**
         * Active manager
         * @returns {any}
         */
        activeManager() {
            return this.$store.state.fm.activeManager;
        },

        /**
         * Progress bar value - %
         * @returns {number}
         */
        progressBar() {
            return this.$store.state.fm.messages.actionProgress;
        },

        /**
         * App has errors
         * @returns {boolean}
         */
        hasErrors() {
            return !!this.$store.state.fm.messages.errors.length;
        },

        /**
         * Files count in selected directory
         * @returns {*}
         */
        filesCount() {
            return this.$store.getters[`fm/${this.activeManager}/filesCount`];
        },

        /**
         * Directories count in selected directory
         * @returns {*}
         */
        directoriesCount() {
            return this.$store.getters[`fm/${this.activeManager}/directoriesCount`];
        },

        /**
         * Files size in selected directory
         * @returns {*|string}
         */
        filesSize() {
            return this.bytesToHuman(this.$store.getters[`fm/${this.activeManager}/filesSize`]);
        },

        /**
         * Count files and folders
         * @returns {*}
         */
        selectedCount() {
            return this.$store.getters[`fm/${this.activeManager}/selectedCount`];
        },

        /**
         * Calculate selected files size
         * @returns {*|string}
         */
        selectedFilesSize() {
            return this.bytesToHuman(this.$store.getters[`fm/${this.activeManager}/selectedFilesSize`]);
        },

        /**
         * Clipboard - action type
         * @returns {null}
         */
        clipboardType() {
            return this.$store.state.fm.clipboard.type;
        },

        /**
         * Spinner
         * @returns {number}
         */
        loadingSpinner() {
            return this.$store.state.fm.messages.loading;
        },
    },
    methods: {
        /**
         * Show modal window
         * @param modalName
         */
        showModal(modalName) {
            this.$store.commit('fm/modal/setModalState', {
                modalName,
                show: true,
            });
        },
    },
};
</script>

<style lang="scss">
.fm-info-block {
    flex: 0 0 auto;
    padding-top: 0.2rem;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid #6c757d;

    .progress {
        margin-top: 0.3rem;
    }

    .text-right > span {
        padding-left: 0.5rem;
        cursor: pointer;
    }
}
</style>
