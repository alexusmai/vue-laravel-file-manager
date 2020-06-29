<template>
    <div class="modal-content fm-modal-properties">
        <div class="modal-header">
            <h5 class="modal-title">{{ lang.modal.properties.title }}</h5>
            <button type="button" class="close" aria-label="Close" v-on:click="hideModal">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-2">{{ lang.modal.properties.disk }}:</div>
                <div class="col-9">{{ selectedDisk }}</div>
                <div class="col-1 text-right">
                    <i v-on:click="copyToClipboard(selectedDisk)"
                       v-bind:title="lang.clipboard.copy"
                       class="far fa-copy"/>
                </div>
            </div>
            <div class="row">
                <div class="col-2">{{ lang.modal.properties.name }}:</div>
                <div class="col-9">{{ selectedItem.basename }}</div>
                <div class="col-1 text-right">
                    <i v-on:click="copyToClipboard(selectedItem.basename)"
                       v-bind:title="lang.clipboard.copy"
                       class="far fa-copy"/>
                </div>
            </div>
            <div class="row">
                <div class="col-2">{{ lang.modal.properties.path }}:</div>
                <div class="col-9">{{ selectedItem.path }}</div>
                <div class="col-1 text-right">
                    <i v-on:click="copyToClipboard(selectedItem.path)"
                       v-bind:title="lang.clipboard.copy"
                       class="far fa-copy"/>
                </div>
            </div>
            <template v-if="selectedItem.type === 'file'">
                <div class="row">
                    <div class="col-2">{{ lang.modal.properties.size }}:</div>
                    <div class="col-9">{{ bytesToHuman(selectedItem.size) }}</div>
                    <div class="col-1 text-right">
                        <i v-on:click="copyToClipboard(bytesToHuman(selectedItem.size))"
                           v-bind:title="lang.clipboard.copy"
                           class="far fa-copy"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2">{{ lang.modal.properties.url }}:</div>
                    <div class="col-9">
                        <span v-if="url">{{ url }}</span>
                        <span v-else>
                            <button v-on:click="getUrl" type="button"
                                    class="btn btn-sm btn-light">
                                <i class="fas fa-sm fa-link"/> Get URL
                            </button>
                        </span>
                    </div>
                    <div v-if="url" class="col-1 text-right">
                        <i v-on:click="copyToClipboard(url)"
                           v-bind:title="lang.clipboard.copy"
                           class="far fa-copy"/>
                    </div>
                </div>
            </template>
            <template v-if="selectedItem.hasOwnProperty('timestamp')">
                <div class="row">
                    <div class="col-2">{{ lang.modal.properties.modified }}:</div>
                    <div class="col-9">{{ timestampToDate(selectedItem.timestamp) }}</div>
                    <div class="col-1 text-right">
                        <i v-on:click="copyToClipboard(timestampToDate(selectedItem.timestamp))"
                           v-bind:title="lang.clipboard.copy"
                           class="far fa-copy"/>
                    </div>
                </div>
            </template>
            <template v-if="selectedItem.hasOwnProperty('acl')">
                <div class="row">
                    <div class="col-2">{{ lang.modal.properties.access }}:</div>
                    <div class="col-9">{{ lang.modal.properties['access_' + selectedItem.acl] }}</div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import modal from '../mixins/modal';
import translate from '../../../mixins/translate';
import helper from '../../../mixins/helper';
import EventBus from '../../../eventBus';

export default {
  name: 'Properties',
  mixins: [modal, translate, helper],
  data() {
    return {
      url: null,
    };
  },
  computed: {
    /**
     * Selected disk
     * @returns {*}
     */
    selectedDisk() {
      return this.$store.getters['fm/selectedDisk'];
    },

    /**
     * Selected file
     * @returns {*}
     */
    selectedItem() {
      return this.$store.getters['fm/selectedItems'][0];
    },
  },
  methods: {
    /**
     * Get URL
     */
    getUrl() {
      this.$store.dispatch('fm/url', {
        disk: this.selectedDisk,
        path: this.selectedItem.path,
      }).then((response) => {
        if (response.data.result.status === 'success') {
          this.url = response.data.url;
        }
      });
    },

    /**
     * Copy text to clipboard
     * @param text
     */
    copyToClipboard(text) {
      // create input
      const copyInputHelper = document.createElement('input');
      copyInputHelper.className = 'copyInputHelper';
      document.body.appendChild(copyInputHelper);
      // add text
      copyInputHelper.value = text;
      copyInputHelper.select();
      // copy text to clipboard
      document.execCommand('copy');
      // clear
      document.body.removeChild(copyInputHelper);

      // Notification
      EventBus.$emit('addNotification', {
        status: 'success',
        message: this.lang.notifications.copyToClipboard,
      });
    },
  },
};
</script>

<style lang="scss">
    .fm-modal-properties .modal-body{
        .row {
            margin-bottom: 0.3rem;
            padding-top: 0.3rem;
            padding-bottom: 0.3rem;

            .fa-copy {
                padding-top: 0.2rem;
                display: none;
                cursor: pointer;
            }

            &:hover {
                background-color: #f8f9fa;

                & .fa-copy {
                    display: block;
                }
            }
        }

        .col-2 {
            font-weight: bold;
        }

        .col-9 {
            word-wrap: break-word;
        }
    }
</style>
