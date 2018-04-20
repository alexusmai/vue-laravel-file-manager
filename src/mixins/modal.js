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
    // active manager
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
