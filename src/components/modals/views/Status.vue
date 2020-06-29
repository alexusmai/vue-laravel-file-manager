<template>
    <div class="modal-content fm-modal-errors">
        <div class="modal-header">
            <h5 class="modal-title">{{ lang.modal.status.title }}</h5>
            <button type="button" class="close" aria-label="Close" v-on:click="hideModal">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div v-if="errors.length">
                <ul class="list-unstyled">
                    <li v-for="(item, index) in errors" v-bind:key="index">
                        {{ item.status }} - {{ item.message }}
                    </li>
                </ul>
            </div>
            <div v-else>
                <span>{{ lang.modal.status.noErrors }}</span>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-danger"
                    v-bind:disabled="!errors.length"
                    v-on:click="clearErrors">{{ lang.btn.clear }}</button>
            <button class="btn btn-light" v-on:click="hideModal">{{ lang.btn.cancel }}</button>
        </div>
    </div>
</template>

<script>
import modal from '../mixins/modal';
import translate from '../../../mixins/translate';

export default {
  name: 'Status',
  mixins: [modal, translate],
  computed: {
    /**
     * Application errors
     * @returns {default.computed.errors|(function())|Array|boolean}
     */
    errors() {
      return this.$store.state.fm.messages.errors;
    },
  },
  methods: {
    /**
     * Clear all errors
     */
    clearErrors() {
      this.$store.commit('fm/messages/clearErrors');
    },
  },
};
</script>
