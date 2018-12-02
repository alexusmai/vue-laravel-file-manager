export default {
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

  /**
   * Main modal block - set height
   * @param state
   * @param height
   */
  setModalBlockHeight(state, height) {
    state.modalBlockHeight = height;
  },
};
