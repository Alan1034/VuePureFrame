const path = require("path");
const webpack = require("webpack");
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                ),
                use: [
                    // "thread-loader",// 多线程编译，可能会导致报错
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
                test: /\.(png|jpg|gif|svg)$/,
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
                        // "thread-loader",// 多线程编译，可能会导致报错
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
    resolve: {
        extensions: ['\*', '.js', '.jsx', '.vue'],// 能够使用户在引入模块时不带扩展
        alias: {
            "@": path.resolve(__dirname, '../src'),
        },
    },
    output: {
        path: path.resolve(__dirname, "../dist/"),
        filename: "bundle.js"
    },
    //why:https://github.com/vuejs/vue-next/tree/master/packages/vue#bundler-build-feature-flags
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: `Vue Starter`,
            favicon: path.resolve(__dirname, "../public/favicon.ico"),
            template: path.resolve(__dirname, "../public/index.html")
        }),
        new webpack.DefinePlugin({
            "__VUE_OPTIONS_API__": true,
            "__VUE_PROD_DEVTOOLS__": false,
        })]
};