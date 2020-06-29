<template>
    <div class="modal-content fm-modal-about">
        <div class="modal-header">
            <h5 class="modal-title">{{ lang.modal.about.title }}</h5>
            <button type="button" class="close" aria-label="Close" v-on:click="hideModal">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <strong>{{ lang.modal.about.name }}</strong>
            <hr>
            <dl class="row">
                <dt class="col-3">{{ lang.modal.about.version }}:</dt>
                <dd class="col-9">{{ version }}</dd>

                <dt class="col-3">{{ lang.modal.about.developer }}:</dt>
                <dd class="col-9">Aleksandr Manekin (alexusmai@gmail.com)</dd>

                <dt class="col-3">GitHub:</dt>
                <dd class="col-9">
                    <a href="https://github.com/alexusmai/laravel-file-manager" target="_blank">
                        alexusmai/laravel-file-manager
                    </a>
                    <br>
                    <a href="https://github.com/alexusmai/vue-laravel-file-manager" target="_blank">
                        alexusmai/vue-laravel-file-manager
                    </a>
                </dd>
            </dl>
        </div>
    </div>
</template>

<script>
import modal from '../mixins/modal';
import translate from '../../../mixins/translate';

export default {
  name: 'About',
  mixins: [modal, translate],
  computed: {
    /**
     * App version
     * @returns {*}
     */
    version() {
      return this.$store.state.fm.settings.version;
    },
  },
};
</script>
