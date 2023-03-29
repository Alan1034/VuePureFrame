import { defineConfig, splitVendorChunkPlugin, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';
const resolve = (dir) => path.resolve(__dirname, dir);
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
    // vite环境变量配置
    define: {
      "CURRENT_ENV": JSON.stringify(env.CURRENT_ENV),
    },

    plugins: [
      vue(),
      splitVendorChunkPlugin(),
      vueJsx({
        // options are passed on to @vue/babel-plugin-jsx
      }),],
    server: {
      open: true,
    },
    resolve: {
      alias: {
        '@': resolve('src'),//路径化名
      },
      // extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    build: {
      minify: 'terser',
      //打包环境移除console.log，debugger
      // terserOptions: {
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: true,
      //   },
      // },
      //打包文件按照类型分文件夹显示
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-chunk-[hash:7].js',
          entryFileNames: 'js/[name]-app-[hash:7].js',
          assetFileNames: '[ext]/[name]-chunk-[hash:7].[ext]',
        },
      },
    },
  }
})
