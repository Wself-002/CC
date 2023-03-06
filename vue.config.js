const isProd = process.env.NODE_ENV == "production";
module.exports = {
  devServer: { disableHostCheck: true },
  publicPath: "./",
  lintOnSave: true,
  productionSourceMap: isProd ? false : true,
  css: isProd
    ? {
        extract: {
          filename: `css/[name].[chunkhash].css`,
          chunkFilename: `css/[name].[chunkhash].css`,
        },
      }
    : {},
  configureWebpack: (config) => {
    config.externals = { ShareTrace: "ShareTrace" };
    config.optimization = {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace("@", "")}`;
            },
          },
        },
      },
    };
    if (isProd) {
      Object.assign(config, {
        output: {
          ...config.output,
          filename: `js/[name].[chunkhash].js`,
          chunkFilename: `js/[name].[chunkhash].js`,
        },
      });
    }
  },
};
