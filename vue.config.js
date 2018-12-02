module.exports = {
  configureWebpack: {
    // No need for splitting
    optimization: {
      splitChunks: false
    }
  }
};
