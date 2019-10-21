<template>
  <div class="fm d-flex flex-column"
       v-bind:class="{ 'fm-full-screen': fullScreen }">
    <navbar></navbar>
    <div class="fm-body">
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
/* eslint-disable import/no-duplicates, no-param-reassign */
import { mapState } from 'vuex';
// Axios
import HTTP from './http/axios';
import EventBus from './eventBus';
// Components
import Navbar from './components/blocks/Navbar.vue';
import FolderTree from './components/tree/FolderTree.vue';
import LeftManager from './components/manager/Manager.vue';
import RightManager from './components/manager/Manager.vue';
import Modal from './components/modals/Modal.vue';
import InfoBlock from './components/blocks/InfoBlock.vue';
import ContextMenu from './components/blocks/ContextMenu.vue';
import Notification from './components/blocks/Notification.vue';
// Mixins
import translate from './mixins/translate';

export default {
  name: 'FileManager',
  mixins: [translate],
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
  props: {
    /**
     * LFM manual settings
     */
    settings: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  created() {
    // manual settings
    this.$store.commit('fm/settings/manualSettings', this.settings);

    // initiate Axios
    this.$store.commit('fm/settings/initAxiosSettings');
    this.requestInterceptor();
    this.responseInterceptor();

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
  destroyed() {
    // reset state
    this.$store.dispatch('fm/resetState');

    // delete events
    EventBus.$off(['contextMenu', 'addNotification']);
  },
  computed: {
    ...mapState('fm', {
      windowsConfig: state => state.settings.windowsConfig,
      activeManager: state => state.settings.activeManager,
      showModal: state => state.modal.showModal,
      fullScreen: state => state.settings.fullScreen,
    }),
  },
  methods: {
    /**
     * Add axios request interceptor
     */
    requestInterceptor() {
      HTTP.interceptors.request.use((config) => {
        // overwrite base url and headers
        config.baseURL = this.$store.getters['fm/settings/baseUrl'];
        config.headers = this.$store.getters['fm/settings/headers'];

        // loading spinner +
        this.$store.commit('fm/messages/addLoading');

        return config;
      }, (error) => {
        // loading spinner -
        this.$store.commit('fm/messages/subtractLoading');
        return Promise.reject(error);
      });
    },

    /**
     * Add axios response interceptor
     */
    responseInterceptor() {
      HTTP.interceptors.response.use((response) => {
        // loading spinner -
        this.$store.commit('fm/messages/subtractLoading');

        // create notification, if find message text
        if (Object.prototype.hasOwnProperty.call(response.data, 'result')) {
          if (response.data.result.message) {
            const message = {
              status: response.data.result.status,
              message: Object.prototype.hasOwnProperty.call(this.lang.response, response.data.result.message)
                ? this.lang.response[response.data.result.message]
                : response.data.result.message,
            };

            // show notification
            EventBus.$emit('addNotification', message);

            // set action result
            this.$store.commit('fm/messages/setActionResult', message);
          }
        }

        return response;
      }, (error) => {
        // loading spinner -
        this.$store.commit('fm/messages/subtractLoading');

        const errorMessage = {
          status: 0,
          message: '',
        };

        const errorNotificationMessage = {
          status: 'error',
          message: '',
        };

        // add message
        if (error.response) {
          errorMessage.status = error.response.status;

          if (error.response.data.message) {
            const trMessage = Object.prototype.hasOwnProperty.call(this.lang.response, error.response.data.message)
              ? this.lang.response[error.response.data.message]
              : error.response.data.message;

            errorMessage.message = trMessage;
            errorNotificationMessage.message = trMessage;
          } else {
            errorMessage.message = error.response.statusText;
            errorNotificationMessage.message = error.response.statusText;
          }
        } else if (error.request) {
          errorMessage.status = error.request.status;
          errorMessage.message = error.request.statusText || 'Network error';
          errorNotificationMessage.message = error.request.statusText || 'Network error';
        } else {
          errorMessage.message = error.message;
          errorNotificationMessage.message = error.message;
        }

        // set error message
        this.$store.commit('fm/messages/setError', errorMessage);

        // show notification
        EventBus.$emit('addNotification', errorNotificationMessage);

        return Promise.reject(error);
      });
    },

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
      display: flex;
      height: 100%;
      margin-right: -15px;
      margin-left: -15px;
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

