module.exports = {
  filenameHashing : false,
  runtimeCompiler : true,
  configureWebpack: {
    optimization: {
      splitChunks: false,
      minimize: true,
    },
  },
};
