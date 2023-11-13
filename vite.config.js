import legacy from '@vitejs/plugin-legacy'
import { fileURLToPath } from 'url'
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { compression } from 'vite-plugin-compression2'
import { updateVersion } from "./vitePlugin";
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import path from 'path';
const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = path.dirname(__filenameNew)
const resolve = (dir) => path.resolve(__dirnameNew, dir);
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  // console.log(command)
  // console.log(env)
  // console.log(env.CURRENT_ENV)
  // console.log(env.APP_ENV)
  // console.log(env.VUE_APP_BASE_API)
  return {
    base: "/VuePureFrame/", // 部署在GitHub Pages需要加上base，詳見：https://cn.vitejs.dev/guide/static-deploy.html#github-pages
    // vite环境变量配置
    define: {
      "CURRENT_ENV": JSON.stringify(env.CURRENT_ENV),
    },

    server: {
      open: true,
      // proxy: {
      //   '/api': {
      //     target: 'https://test.com',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ''),
      //     // secure: false, // 如果是https接口，需要配置这个参数 
      //   },
      //   '/weixinRobot': {
      //     target: 'https://test.com', changeOrigin: true, secure: false, // 如果是https接口，需要配置这个参数 
      //   }
      // },
    },
    resolve: {
      alias: {
        // 'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        '@': resolve('src'),//路径化名
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },

    plugins: [
      /**
       * @description: 更新package.json的版本信息， apply: 'build'打包时才调用
       * @return {*}
       */
      {
        ...updateVersion(),
        apply: 'build',
      },

      /**
       * @description: vite自带的文件分割配置
       * @return {*}
       */
      {
        ...splitVendorChunkPlugin(),
        apply: 'build',
      },
      /**
       * @description: 图片压缩插件
       * @return {*}
       */
      {
        ...ViteImageOptimizer({
          /* pass your config */
        }),
        // enforce: 'pre',
        apply: 'build',
      },

      /**
       * @description: 生成gzip文件，使网页加载更快
       * @return {*}
       */
      {
        ...compression(
          // {
          //   deleteOriginalAssets: true,
          //   exclude: ["./public/**"]
          // }
        ),
        // enforce: 'post',
        apply: 'build',
      },
      /**
       * @description: 兼容旧版本浏览器
       * @return {*}
       */
      {
        ...legacy({
          targets: ['defaults'],
        }),
        apply: 'build',
      },
      /**
      * @description: 代码压缩加密
      * @return {*}
      */
      env.DEV_ENV !== 'testProduction' ? obfuscatorPlugin({
        include: [// "src/path/to/file.js", "path/anyjs/**/*.js", /foo.js$/
          "src/assets/**",
          "src/api/**",
          "src/indexDB/**",
          "src/language/**",
          "src/utils/**",
          // "src/views/**",
          // "src/styles/**",
        ],
        // exclude: [/node_modules/, "src/indexDB/**"],
        // apply: "build",
        // debugger: true,
        options: {
          // your javascript-obfuscator options
          debugProtection: env.DEV_ENV === 'production' ? true : false,
          // ...  [See more options](https://github.com/javascript-obfuscator/javascript-obfuscator)
        },
      }) : {},
      vue(),
      vueJsx(),
    ],
    css: {
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript
          javascriptEnabled: true,
        },
      },
    },
    /**
     * @description: 打包时才调用
     * @return {*}
     */
    build: {
      // minify: 'terser',
      //打包环境移除console.log，debugger
      // terserOptions: {
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: true,
      //   },
      // },
      //打包文件按照类型分文件夹显示（貌似会导致性能下降）
      // rollupOptions: {
      //   output: {
      //     chunkFileNames: 'js/[name]-chunk-[hash:7].js',
      //     entryFileNames: 'js/[name]-app-[hash:7].js',
      //     assetFileNames: '[ext]/[name]-chunk-[hash:7].[ext]',
      //   },
      // },
    },
  }
})
