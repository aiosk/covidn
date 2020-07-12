module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/covidn/" : "/",
  productionSourceMap: process.env.NODE_ENV !== "production",
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
    },
    externals: {
      lazyload: "LazyLoad",
      chartjs: "Chart",
      domtoimage: "domtoimage",
    },
  },
};
