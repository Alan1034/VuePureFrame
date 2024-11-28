/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-04-03 16:44:57
 * @LastEditTime: 2024-11-28 17:41:53
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description:
 * Service worker 修复了这个问题。使用 service worker，你可以将 app 设置为首先使用缓存资源，从而即使在离线状态，也可以提供默认的体验，然后从网络获取更多数据（通常称为“离线优先”）。这已经在原生 app 中可用，这是经常选择原生 app，而不是选择 web app 的主要原因之一。
 * service worker 的功能类似于代理服务器，允许你去修改请求和响应，将其替换成来自其自身缓存的项目。
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers
 *
 * @FilePath: \VuePureFrame\src\utils\serviceWorker.ts
 *
 */
import pageageInfo from '../../package.json'

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        `${APP_BASE_API ? '/' + APP_BASE_API : ''}/sw.js`,
        {
          scope: `${APP_BASE_API ? '/' + APP_BASE_API : ''}/`
        }
      )
      const version = localStorage.getItem('version')
      // console.log("version", version)
      if (!version) {
        localStorage.setItem('version', pageageInfo.version)
      }
      // console.log("pageageInfo.version", pageageInfo.version)
      if (version !== pageageInfo.version) {
        // ServiceWorkerRegistration 的 update 方法尝试更新 service worker。获得 worker 脚本的 URL，逐字节匹配新获取的 worker 和当前的 worker，存在差异的时候安装新的 worker。获取 worker 脚本的更新操作会忽略浏览器缓存的 24 小时前的内容。
        registration.update()
        console.info('serviceWorker update')
        localStorage.setItem('version', pageageInfo.version)
      }
    } catch (error) {
      console.warn(`Registration failed with ${error}`)
      return
    }
    // });
  }
}
