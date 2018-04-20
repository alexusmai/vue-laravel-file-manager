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
                <dd class="col-9">1.0.0</dd>

                <dt class="col-3">{{ lang.modal.about.developer }}:</dt>
                <dd class="col-9">Aleksandr Manekin - alexusmai@gmail.com</dd>

                <dt class="col-3">GitHub:</dt>
                <dd class="col-9">
                    <a href="https://github.com/alexusmai/vue-laravel-file-manager" target="_blank" class="pr-3">Frontend</a>
                    <a href="https://github.com/alexusmai/laravel-file-manager" target="_blank">Backend</a>
                </dd>

                <dt class="col-3">{{ lang.modal.about.site }}:</dt>
                <dd class="col-9"><a href="http://webmai.ru/projects/file-manager" target="_blank">webmai.ru</a></dd>
            </dl>
        </div>
        <div class="modal-footer">
            <button class="btn btn-default" v-on:click="hideModal">{{ lang.btn.cancel }}</button>
        </div>
    </div>
</template>

<script>
import modal from '../../mixins/modal';
import helper from '../../mixins/helper';

export default {
  name: 'About',
  mixins: [modal, helper],
  computed: {
  },
};
</script>
