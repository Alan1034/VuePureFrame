const path = require("path");
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // host: '0.0.0.0',
    contentBase: path.join(__dirname, "public"),
    port: 3000,
    publicPath: "http://localhost",
    hot: true,
    open: true, //自动打开浏览器
    historyApiFallback: true, // 使用H5路由需要配置
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://localhost:8080`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
  },
});