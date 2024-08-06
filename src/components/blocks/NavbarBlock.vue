<template>
    <div class="fm-navbar mb-3">
        <div class="row justify-content-between">
            <div class="col-auto d-flex ml-4">
                <div class="btn-group" role="group">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        v-on:click="showModal('NewFolderModal')"
                        v-bind:title="lang.btn.folder"
                    >
                        <i class="bi bi-folder"></i>
                    </button>
                    <button
                        type="button"
                        class="btn btn-secondary"
                        v-bind:disabled="!clipboardType"
                        v-bind:title="lang.btn.paste"
                        v-on:click="paste"
                    >
                        <i class="bi bi-clipboard"></i>
                    </button>
                </div>
                <div>
                    <a
								        id="upload-link-button"
                        :href="uploadUrl"
                        class="ml-4 btn back-blue bluebtn-hover shadow roundness-10"
                        role="button"
                        style="color: #fff;"
                    >
                    <span class="pre">資料アップロード</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import translate from '../../mixins/translate';

export default {
    name: 'NavbarBlock',
    mixins: [translate],
    data() {
        return {
            isEditor: Number(isEditor),
        };
    },
    computed: {
        /**
         * Active manager name
         * @returns {any}
         */
        activeManager() {
            return this.$store.state.fm.activeManager;
        },

        /**
         * Clipboard - action type
         * @returns {null}
         */
        clipboardType() {
            return this.$store.state.fm.clipboard.type;
        },
    },
    methods: {
        /**
         * Paste
         */
        paste() {
            this.$store.dispatch('fm/paste');
        },
        /**
         * Show modal window
         * @param modalName
         */
        showModal(modalName) {
            // show selected modal
            this.$store.commit('fm/modal/setModalState', {
                modalName,
                show: true,
            });
        },
    },
};
</script>

<style lang="scss">
.fm-navbar {
    flex: 0 0 auto;
}
</style>
