const modal = {
  namespaced: true,
  state: {

    // modal window
    showModal: false,

    // modal name
    modalName: null,
  },
  mutations: {

    /**
     * Modal window state
     * @param state
     * @param show
     * @param modalName
     */
    setModalState(state, { show, modalName }) {
      state.showModal = show;
      state.modalName = modalName;
    },

    /**
     * Clear modal
     * @param state
     */
    clearModal(state) {
      state.showModal = false;
      state.modalName = null;
    },

  },
};

export default modal;
