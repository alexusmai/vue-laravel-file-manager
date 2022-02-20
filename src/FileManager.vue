<template>
    <div class="fm d-flex flex-column" v-bind:class="{ 'fm-full-screen': fullScreen }">
        <navbar-block />
        <div class="fm-body d-flex">
            <notification-block />
            <context-menu />
            <modal-block v-if="showModal" />
            <template v-if="windowsConfig === 1">
                <left-manager class="col" manager="left" />
            </template>
            <template v-else-if="windowsConfig === 2">
                <folder-tree class="col-4 col-md-3" />
                <left-manager class="col-8 col-md-9" manager="left" />
            </template>
            <template v-else-if="windowsConfig === 3">
                <left-manager
                    class="col-12 col-sm-6"
                    manager="left"
                    v-on:click.native="selectManager('left')"
                    v-on:contextmenu.native="selectManager('left')"
                >
                </left-manager>
                <right-manager
                    class="col-12 col-sm-6"
                    manager="right"
                    v-on:click.native="selectManager('right')"
                    v-on:contextmenu.native="selectManager('right')"
                >
                </right-manager>
            </template>
        </div>
        <info-block />
    </div>
</template>

<script>
/* eslint-disable import/no-duplicates, no-param-reassign */
import { mapState } from 'vuex';
// Axios
import HTTP from './http/axios';
import EventBus from './emitter';
// Components
import NavbarBlock from './components/blocks/NavbarBlock.vue';
import FolderTree from './components/tree/FolderTree.vue';
import LeftManager from './components/manager/Manager.vue';
import RightManager from './components/manager/Manager.vue';
import ModalBlock from './components/modals/ModalBlock.vue';
import InfoBlock from './components/blocks/InfoBlock.vue';
import ContextMenu from './components/blocks/ContextMenu.vue';
import NotificationBlock from './components/blocks/NotificationBlock.vue';
// Mixins
import translate from './mixins/translate';

export default {
    name: 'FileManager',
    mixins: [translate],
    components: {
        NavbarBlock,
        FolderTree,
        LeftManager,
        RightManager,
        ModalBlock,
        InfoBlock,
        ContextMenu,
        NotificationBlock,
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
    data() {
        return {
            interceptorIndex: {
                request: null,
                response: null,
            },
        };
    },
    created() {
        // manual settings
        this.$store.commit('fm/settings/manualSettings', this.settings);

        // initiate Axios
        this.$store.commit('fm/settings/initAxiosSettings');
        this.setAxiosConfig();
        this.requestInterceptor();
        this.responseInterceptor();

        // initialize app settings
        this.$store.dispatch('fm/initializeApp');
    },
    destroyed() {
        // reset state
        this.$store.dispatch('fm/resetState');

        // delete events
        EventBus.all.clear();

        // eject interceptors
        HTTP.interceptors.request.eject(this.interceptorIndex.request);
        HTTP.interceptors.response.eject(this.interceptorIndex.response);
    },
    computed: {
        ...mapState('fm', {
            windowsConfig: (state) => state.settings.windowsConfig,
            activeManager: (state) => state.settings.activeManager,
            showModal: (state) => state.modal.showModal,
            fullScreen: (state) => state.settings.fullScreen,
        }),
    },
    methods: {
        /**
         * Axios default config
         */
        setAxiosConfig() {
            HTTP.defaults.baseURL = this.$store.getters['fm/settings/baseUrl'];
            HTTP.defaults.headers = this.$store.getters['fm/settings/headers'];
        },

        /**
         * Add axios request interceptor
         */
        requestInterceptor() {
            this.interceptorIndex.request = HTTP.interceptors.request.use(
                (config) => {
                    // loading spinner +
                    this.$store.commit('fm/messages/addLoading');

                    return config;
                },
                (error) => {
                    // loading spinner -
                    this.$store.commit('fm/messages/subtractLoading');
                    return Promise.reject(error);
                }
            );
        },

        /**
         * Add axios response interceptor
         */
        responseInterceptor() {
            this.interceptorIndex.response = HTTP.interceptors.response.use(
                (response) => {
                    // loading spinner -
                    this.$store.commit('fm/messages/subtractLoading');

                    // create notification, if find message text
                    if (Object.prototype.hasOwnProperty.call(response.data, 'result')) {
                        if (response.data.result.message) {
                            const message = {
                                status: response.data.result.status,
                                message: Object.prototype.hasOwnProperty.call(
                                    this.lang.response,
                                    response.data.result.message
                                )
                                    ? this.lang.response[response.data.result.message]
                                    : response.data.result.message,
                            };

                            // show notification
                            EventBus.emit('addNotification', message);

                            // set action result
                            this.$store.commit('fm/messages/setActionResult', message);
                        }
                    }

                    return response;
                },
                (error) => {
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
                            const trMessage = Object.prototype.hasOwnProperty.call(
                                this.lang.response,
                                error.response.data.message
                            )
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
                    EventBus.emit('addNotification', errorNotificationMessage);

                    return Promise.reject(error);
                }
            );
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
.fm {
    position: relative;
    height: 100%;
    padding: 1rem;
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
        flex: 1 1 auto;
        overflow: hidden;
        position: relative;
        padding-top: 1rem;
        padding-bottom: 1rem;
        border-top: 1px solid #6c757d;
        border-bottom: 1px solid #6c757d;
    }

    .unselectable {
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
    color: #198754;
    background-color: white;
    border-color: #198754;
}

.fm-info {
    color: #0dcaf0;
    background-color: white;
    border-color: #0dcaf0;
}

.fm.fm-full-screen {
    width: 100%;
    height: 100%;
    padding-bottom: 0;
}
</style>
