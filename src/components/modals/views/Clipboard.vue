<template>
    <div class="modal-content fm-modal-clipboard">
        <div class="modal-header">
            <h5 class="modal-title">{{ lang.clipboard.title }}</h5>
            <button type="button" class="close" aria-label="Close" v-on:click="hideModal">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <template v-if="clipboard.type">
                <div class="d-flex justify-content-between">
                    <div class="w-75 text-truncate">
                        <span>
                           <i class="far fa-hdd"/>{{ clipboard.disk }}
                        </span>
                    </div>
                    <div class="text-right text-muted">
                        <span v-bind:title="`${lang.clipboard.actionType} - ${lang.clipboard[clipboard.type]}`">
                            <i v-if="clipboard.type === 'copy'" class="fas fa-copy"/>
                            <i v-else class="fas fa-cut"/>
                        </span>
                    </div>
                </div>
                <hr>
                <div class="d-flex justify-content-between"
                     v-for="(dir, index) in directories"
                     v-bind:key="`d-${index}`">
                    <div class="w-75 text-truncate">
                        <span>
                            <i class="far fa-folder"/>{{ dir.name }}
                        </span>
                    </div>
                    <div class="text-right">
                        <button type="button" class="close"
                                v-bind:title="lang.btn.delete"
                                v-on:click="deleteItem('directories', dir.path)">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <div class="d-flex justify-content-between"
                     v-for="(file, index) in files"
                     v-bind:key="`f-${index}`">
                    <div class="w-75 text-truncate">
                        <span>
                            <i class="far" v-bind:class="file.icon"/>{{ file.name }}
                        </span>
                    </div>
                    <div class="text-right">
                        <button type="button" class="close"
                                v-bind:title="lang.btn.delete"
                                v-on:click="deleteItem('files', file.path)">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </template>
            <template v-else>
                <span>{{ lang.clipboard.none }}</span>
            </template>
        </div>
        <div class="modal-footer">
            <button class="btn btn-danger"
                    v-bind:disabled="!clipboard.type"
                    v-on:click="resetClipboard">{{ lang.btn.clear }}
            </button>
            <button class="btn btn-light" v-on:click="hideModal">{{ lang.btn.cancel }}</button>
        </div>
    </div>
</template>

<script>
import modal from '../mixins/modal';
import translate from '../../../mixins/translate';
import helper from '../../../mixins/helper';

export default {
  name: 'Clipboard',
  mixins: [modal, translate, helper],
  computed: {
    /**
     * Clipboard state
     * @returns {*}
     */
    clipboard() {
      return this.$store.state.fm.clipboard;
    },

    /**
     * Paths and names for directories
     * @returns {{path: *, name: *}[]}
     */
    directories() {
      return this.$store.state.fm.clipboard.directories.map((item) => ({
        path: item,
        name: item.split('/').slice(-1)[0],
      }));
    },

    /**
     * File names, paths and icons
     * @returns {{path: *, name: *, icon: *}[]}
     */
    files() {
      return this.$store.state.fm.clipboard.files.map((item) => {
        const name = item.split('/').slice(-1)[0];
        return {
          path: item,
          name,
          icon: this.extensionToIcon(name.split('.').slice(-1)[0]),
        };
      });
    },
  },
  methods: {
    /**
     * Delete item from clipboard
     * @param type
     * @param path
     */
    deleteItem(type, path) {
      this.$store.commit('fm/truncateClipboard', { type, path });
    },

    /**
     * Reset clipboard
     */
    resetClipboard() {
      this.$store.commit('fm/resetClipboard');
    },
  },
};
</script>

<style lang="scss">
    .fm-modal-clipboard {

        .modal-body .far {
            padding-right: 0.5rem;
        }
    }
</style>
