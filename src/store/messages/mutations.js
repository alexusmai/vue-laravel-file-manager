export default {
  /**
   * Set the result of the action
   * when the message exists
   * @param state
   * @param status
   * @param message
   */
  setActionResult(state, { status, message }) {
    state.actionResult.status = status;
    state.actionResult.message = message;
  },

  /**
   * Clear action result
   * @param state
   */
  clearActionResult(state) {
    state.actionResult.status = null;
    state.actionResult.message = null;
  },

  /**
   * Progress Bar (%) - upload..
   * @param state
   * @param progress
   */
  setProgress(state, progress) {
    state.actionProgress = progress;
  },

  /**
   * Clear progress
   * @param state
   */
  clearProgress(state) {
    state.actionProgress = 0;
  },

  /**
   * Add new action
   * @param state
   */
  addLoading(state) {
    state.loading += 1;
  },

  /**
   * Action finish
   * @param state
   */
  subtractLoading(state) {
    state.loading -= 1;
  },

  /**
   * Clear
   * @param state
   */
  clearLoading(state) {
    state.loading = 0;
  },

  /**
   * Set error message
   * @param state
   * @param error
   */
  setError(state, error) {
    state.errors.push(error);
  },

  /**
   * Clear errors
   * @param state
   */
  clearErrors(state) {
    state.errors = [];
  },
};
