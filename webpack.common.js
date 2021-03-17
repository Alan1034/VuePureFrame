const path = require("path");
const webpack = require("webpack");
const { VueLoaderPlugin } = require('vue-loader')


module.exports = {
  entry: "./src/index.js",
  // mode: "development" | "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        ),
        use: [
          "thread-loader",// 多线程编译
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ],
      },

      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['vue-style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/'
          }
        }
      },
      {
        test: /\.(png|jpg)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/'
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          use: [
            "thread-loader",// 多线程编译
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          ],
        }
      },
    ]
  },
  resolve: { extensions: ['\*', '.js', '.jsx', '.vue'] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  //why:https://github.com/vuejs/vue-next/tree/master/packages/vue#bundler-build-feature-flags
  plugins: [new webpack.HotModuleReplacementPlugin(), new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    "__VUE_OPTIONS_API__": true,
    "__VUE_PROD_DEVTOOLS__": false,
  })]
};