const path = require("path");
const webpack = require("webpack");
const defaultSettings = require('../settings.js')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const name = defaultSettings.title || 'Base管理系统' // 标题
const VUE_APP_BASE_API = process.env.VUE_APP_BASE_API || '/'

module.exports = {
    name,
    entry: "./src/index.js",
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
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
        extensions: ['\*', '.js', '.jsx', '.vue'], // 能够使用户在引入模块时不带扩展
        alias: {
            "@": path.resolve(__dirname, '../src'),
            'vue$': 'vue/dist/vue.esm-bundler.js'
        },
    },
    output: {
        path: path.join(__dirname, "../dist/"),
        filename: "bundle.js"
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: name,
            favicon: path.resolve(__dirname, "../public/favicon.ico"),
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        // 打包时生成一个index.html，需要在entry配置入口DOM，例：
        // if (!document.getElementById("root")) {
        //     const div = document.createElement('div');
        //     div.id = "root";
        //     document.body.appendChild(div);
        // }
        // 配置：https://github.com/jantimon/html-webpack-plugin#options
        new webpack.DefinePlugin({
            'process.env.VUE_APP_BASE_API': JSON.stringify(VUE_APP_BASE_API),
            '__VUE_OPTIONS_API__': true,
            '__VUE_PROD_DEVTOOLS__': false,
        })
    ],
    //why:https://github.com/vuejs/vue-next/tree/master/packages/vue#bundler-build-feature-flags
};