export default {
    directives: {
        /**
         * AutoFocus for inputs
         */
        focus: {
            inserted(el) {
                el.focus();
            },
        },
    },
    computed: {
        /**
         * Active manager
         * @returns {any}
         */
        activeManager() {
            return this.$store.state.fm.activeManager;
        },
    },
    methods: {
        /**
         * Hide modal window
         */
        hideModal() {
            this.$store.commit('fm/modal/setModalState', {
                modalName: null,
                show: false,
            });
        },
    },
};
