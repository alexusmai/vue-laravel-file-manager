<template>
  <div class="fm d-flex flex-column"
       v-bind:class="{ 'fm-full-screen': fullScreen }">
    <navbar></navbar>
    <div class="row fm-body">
      <notification></notification>
      <context-menu></context-menu>
      <modal v-if="showModal"></modal>
      <template v-if="windowsConfig === 1">
        <left-manager class="col" manager="left"></left-manager>
      </template>
      <template v-else-if="windowsConfig === 2">
        <folder-tree class="col-4 col-md-3"></folder-tree>
        <left-manager class="col-8 col-md-9" manager="left"></left-manager>
      </template>
      <template v-else-if="windowsConfig === 3">
        <left-manager class="col-12 col-sm-6"
                      manager="left"
                      v-on:click.native="selectManager('left')"
                      v-on:contextmenu.native="selectManager('left')">
        </left-manager>
        <right-manager class="col-12 col-sm-6"
                       manager="right"
                       v-on:click.native="selectManager('right')"
                       v-on:contextmenu.native="selectManager('right')">
        </right-manager>
      </template>
    </div>
    <info-block></info-block>
  </div>
</template>

<script>
/* eslint-disable import/no-duplicates */
import { mapState } from 'vuex';
// Axios interceptors
import { requestInterceptor, responseInterceptor } from './http/interceptors';
// Components
import Navbar from './components/blocks/Navbar.vue';
import FolderTree from './components/tree/FolderTree.vue';
import LeftManager from './components/manager/Manager.vue';
import RightManager from './components/manager/Manager.vue';
import Modal from './components/modals/Modal.vue';
import InfoBlock from './components/blocks/InfoBlock.vue';
import ContextMenu from './components/blocks/ContextMenu.vue';
import Notification from './components/blocks/Notification.vue';

export default {
  name: 'FileManager',
  components: {
    Navbar,
    FolderTree,
    LeftManager,
    RightManager,
    Modal,
    InfoBlock,
    ContextMenu,
    Notification,
  },
  computed: {
    ...mapState('fm', {
      windowsConfig: state => state.settings.windowsConfig,
      activeManager: state => state.settings.activeManager,
      showModal: state => state.modal.showModal,
      fullScreen: state => state.settings.fullScreen,
    }),
  },
  created() {
    // init base url
    this.$store.commit('fm/settings/initBaseUrl');

    // add axios request interceptor
    requestInterceptor();

    // add axios response interceptor
    responseInterceptor();

    // initialize app settings
    this.$store.dispatch('fm/initializeApp');

    /**
     * todo Keyboard event
     */
    /*
    window.addEventListener('keyup', (event) => {
      event.preventDefault();
      event.stopPropagation();

      EventBus.$emit('keyMonitor', event);
    });
    */
  },
  methods: {
    /**
     * Select manager (when shown 2 file manager windows)
     * @param managerName
     */
    selectManager(managerName) {
      if (this.activeManager !== managerName) {
        this.$store.commit('fm/setActiveManager', managerName);
      }
    },
  },
};
</script>

<style lang="scss">
  @import "~plyr/src/sass/plyr.scss";
  .fm {
    position: relative;
    height: 100%;
    padding: 1rem 1rem 0;
    background-color: white;

    &:-moz-full-screen {
      background-color: white;
    }

    &:-webkit-full-screen {
      background-color: white;
    }

    &:fullscreen {
      background-color: white;
    }

    .fm-body {
      height: 100%;
      position: relative;
      padding-top: 1rem;
      padding-bottom: 1rem;
      border-top: 1px solid #6d757d;
      border-bottom: 1px solid #6d757d;
    }

    .unselectable {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }

  .fm-error {
    color: white;
    background-color: #dc3545;
    border-color: #dc3545;
  }

  .fm-danger {
    color: #dc3545;
    background-color: white;
    border-color: #dc3545;
  }

  .fm-warning {
    color: #ffc107;
    background-color: white;
    border-color: #ffc107;
  }

  .fm-success {
    color: #28a745;
    background-color: white;
    border-color: #28a745;
  }

  .fm-info {
    color: #17a2b8;
    background-color: white;
    border-color: #17a2b8;
  }

  .fm.fm-full-screen {
    width: 100%;
    height: 100%;
    padding-bottom: 0;
  }
</style>

