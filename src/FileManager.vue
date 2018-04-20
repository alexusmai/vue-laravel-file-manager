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
                <folder-tree class="col-4 col-md-3 col-xl-2"></folder-tree>
                <left-manager class="col-8 col-md-9 col-xl-10" manager="left"></left-manager>
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
/* eslint-disable import/no-duplicates,no-unused-vars */
import { mapState } from 'vuex';
import EventBus from './eventBus';

// Components
import Navbar from './components/Navbar';
import FolderTree from './components/tree/FolderTree';
import LeftManager from './components/manager/Manager';
import RightManager from './components/manager/Manager';
import Modal from './components/modals/Modal';
import InfoBlock from './components/InfoBlock';
import ContextMenu from './components/ContextMenu';
import Notification from './components/Notification';

// Axios
import HTTP from './http/axios-settings';

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
    // add axios request interceptor
    HTTP.interceptors.request.use((config) => {
      // loading spinner +
      this.$store.commit('fm/messages/addLoading');
      // Do something before request is sent
      return config;
    }, (error) => {
      // loading spinner -
      this.$store.commit('fm/messages/subtractLoading');
      // Do something with request error
      return Promise.reject(error);
    });

    // add axios response interceptor
    HTTP.interceptors.response.use(
      (response) => {
        // loading spinner -
        this.$store.commit('fm/messages/subtractLoading');

        // create notification, if find message text
        if (Object.prototype.hasOwnProperty.call(response.data, 'result')) {
          if (response.data.result.message) {
            // show notification
            EventBus.$emit('addNotification', response.data.result);

            // set action result
            this.$store.commit('fm/messages/setActionResult', response.data.result);
          }
        }

        return response;
      }, (error) => {
        // loading spinner -
        this.$store.commit('fm/messages/subtractLoading');

        // set error message
        this.$store.commit('fm/messages/setError', error);

        const errorMessage = {
          status: 'error',
          message: '',
        };

        // add message
        if (error.response) {
          errorMessage.message = error.response.data.message || error.response.statusText;
        } else if (error.request) {
          errorMessage.message = error.request.statusText || 'Network error';
        } else {
          errorMessage.message = error.message;
        }

        // show notification
        EventBus.$emit('addNotification', errorMessage);

        return Promise.reject(error);
      },
    );

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
    .fm {
        position: relative;
        height: 100%;
        padding: 1rem;

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

