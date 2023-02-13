const path = require("path");
const fs = require('fs')
const webpack = require("webpack");
const defaultSettings = require('../settings.js')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv')
const Dotenv = require('dotenv-webpack');

const name = defaultSettings.title || 'Base管理系统' // 标题
const CURRENT_ENV = process.env.CURRENT_ENV || 'prod'

//自动生成env文件路径，用.env.XXX中的XXX去匹配文件
const envConfigPath = {};
const fileDirectory = path.resolve(__dirname, '../')
if (fs.existsSync(fileDirectory)) {
    const files = fs.readdirSync(fileDirectory)
    const env = []
    files.forEach((item) => {
        if ((/\.env/.test(item))) {
            env.push(item)
        }
    })
    env.forEach((item) => {
        const envName = item.split(".")
        envConfigPath[envName[2]] = path.resolve(__dirname, `../${item}`)
    })
}
else {
    console.log(fileDirectory + "  Not Found!");
}

//写在.env文件内的变量并没有被打包前的webpack读取到，在webpack内使用需要手动加入环境变量
const envConfig = dotenv.parse(fs.readFileSync(envConfigPath[CURRENT_ENV]))
for (const k in envConfig) {
    process.env[k] = envConfig[k]
}

module.exports = {
    name,
    // target: 'node',
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
            test: /\.mjs$/,
            include: /node_modules/,
            type: "javascript/auto"
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
                    outputPath: 'fonts/',
                    esModule: false
                }
            }
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: {
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/',
                    esModule: false
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
        extensions: ['\*', '.js', '.jsx', '.vue'], // 具有相同文件名不同扩展名时使用第一个而跳过其他
        symlinks: false, //在yarn link 入其他模块的时候统一使用同一个vue引用，避免vue3的一个报错
        alias: {
            "@": path.resolve(__dirname, '../src'),
            'vue$': 'vue/dist/vue.esm-bundler.js',
            vue: path.resolve(__dirname, `../node_modules/vue`) // 定义vue路径
        },
    },
    output: {
        path: path.resolve(__dirname, "../dist/"),
        publicPath: "./", //配置相对路径,如果使用服务器打开需要使用/，表示在引入静态资源时，从根路径开始引入，如果使用本地打开需要使用绝对路径./
        filename: "bundle.[hash].js" //文件名为bundle+hash值，方便配置全站加速
    },

    plugins: [
        new Dotenv({
            path: envConfigPath[CURRENT_ENV],
        }),
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
            '__VUE_OPTIONS_API__': true,
            '__VUE_PROD_DEVTOOLS__': false,
        })
    ],
    //why:https://github.com/vuejs/vue-next/tree/master/packages/vue#bundler-build-feature-flags
};