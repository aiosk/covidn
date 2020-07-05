module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/covidn/" : "/",
  configureWebpack: {
    externals: {
      lazyload: "LazyLoad",
      chartjs: "Chart",
    },
  },
};
