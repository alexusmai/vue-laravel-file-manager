<template>
    <div class="fm-notification">
        <transition-group name="notify">
            <div
                class="fm-notification-item"
                role="alert"
                v-for="(notification, index) in notifications"
                v-bind:class="`fm-${notification.status}`"
                v-bind:key="`notify-${index}`"
            >
                {{ notification.message }}
            </div>
        </transition-group>
    </div>
</template>

<script>
import EventBus from '../../emitter';

export default {
    name: 'NotificationBlock',
    data() {
        return {
            notifications: [],
        };
    },
    mounted() {
        /**
         * Listen 'addNotification' events
         */
        EventBus.on('addNotification', ({ status, message }) => this.addNotification(status, message));
    },
    methods: {
        /**
         * Show new notification
         * @param status
         * @param message
         */
        addNotification(status, message) {
            this.notifications.push({
                status,
                message,
            });
            // timeout for closing
            setTimeout(() => {
                this.notifications.shift();
            }, 3000);
        },
    },
};
</script>

<style lang="scss">
.fm-notification {
    position: absolute;
    right: 1rem;
    bottom: 0;
    z-index: 9999;
    width: 350px;
    display: block;
    transition: opacity 0.4s ease;
    overflow: auto;

    .fm-notification-item {
        padding: 0.75rem 1.25rem;
        margin-bottom: 1rem;
        border: 1px solid;
        border-radius: 0.25rem;
    }

    .notify-enter-active {
        transition: all 0.3s ease;
    }

    .notify-leave-active {
        transition: all 0.8s ease;
    }

    .notify-enter,
    .notify-leave-to {
        opacity: 0;
    }
}
</style>
