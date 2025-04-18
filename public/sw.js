/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-04-03 16:52:20
 * @LastEditTime: 2025-04-18 21:53:14
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: service worker 最大的作用域是 worker 所在的位置（换句话说，如果脚本 sw.js 位于 /js/sw.js 中，默认情况下它只能控制 /js/ 下的 URL）。可以使用 Service-Worker-Allowed 标头指定 worker 的最大作用域列表。
 * @FilePath: \VuePureFrame\public\sw.js
 *
 */

let CACHE_NAME = 'v1'
// self.onmessage = function handleMessageFromMain(msg) {
//   console.log("message from main received in worker:", msg);
// };
// console.log("CACHE_NAME", CACHE_NAME)
const urlsToCache = [
  '/js/',
  '/images/',
  '/css/',
  '/assets/',
]

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(CACHE_NAME)
  for await (let i of resources) {
    try {
      await cache.add(i)
    } catch (err) {
      console.warn('sw: cache.add err', i)
    }
  }
}

const putInCache = async (request, response) => {
  try {
    if (request && request.method === 'POST') {
      return
    }
    const cache = await caches.open(CACHE_NAME)
    await cache.put(request, response)
  } catch (error) {
    console.error(error, request, response)
  }
}

self.addEventListener('install', (event) => {
  // console.log("CACHE_NAME", CACHE_NAME)
  if (!CACHE_NAME) {
    return
  }
  // console.log("install", event)
  // 虽然 self.skipWaiting() 可以在 service worker 执行期间的任何时间点调用，但是它只有在新安装的 service worker 可能保持在 waiting 状态的时候才会起作用。因此，通常从 InstallEvent 处理程序内部调用 self.skipWaiting()。
  self.skipWaiting()
  event.waitUntil(addResourcesToCache([...urlsToCache]))
})

const isExitInCacheList = (list, url) => {
  return list.some(value => {
    const path = new URL(url).pathname
    return path.startsWith(value)
  })
}
try {
  new URL(self.origin) // 验证 origin 合法性
} catch {
  self.origin = location.origin // 回退到 location.origin
}
const cacheFirst = async ({ request, preloadResponsePromise, event }) => {
  // 首先，尝试从缓存中获取资源
  const responseFromCache = await caches.match(request)
  if (responseFromCache && isExitInCacheList(urlsToCache, event.request.url)) {
    // console.log("responseFromCache", responseFromCache, event.request.url)
    return responseFromCache
  }

  // 接下来，尝试使用缓存或预加载的响应
  const preloadResponse = await preloadResponsePromise
  if (preloadResponse && isExitInCacheList(urlsToCache, event.request.url)) {
    // console.info("using preload response", preloadResponse, event.request.url);
    putInCache(request, preloadResponse.clone())
    return preloadResponse
  }

  // 然后尝试从网络中获取资源
  try {
    // 强制指定server-worker中fetch更新缓存形式，防止不同的浏览器表现不一致，同时指定首页html容器文件不做缓存
    let cache = 'default'
    const reqUrl = new URL(event.request.url)
    // console.log(reqUrl)
    // console.log(reqUrl.pathname)
    // if (`${location.origin}/` === `${event.request.url}`) {

    if (reqUrl.pathname === '/' && reqUrl.origin === self.origin) {
      cache = 'no-store'
      // console.log(event.request.url,"event.request.url")
      // console.log(location.origin,"event.request.url")
      // console.log('cache', cache)
    }
    const responseFromNetwork = await fetch(request, { cache })
    // 响应可能会被使用（只有符合urlsToCache过滤的情况下）
    // 我们需要将它的拷贝放入缓存
    // 然后再返回该响应
    if (isExitInCacheList(urlsToCache, event.request.url)) {
      putInCache(request, responseFromNetwork.clone())
    }
    // console.log("responseFromNetwork", responseFromNetwork, event.request.url)
    return responseFromNetwork
  } catch (error) {
    console.error('Network error happened', error)
    const myBlob = new Blob(['Network error happened'])
    return new Response(myBlob, {
      status: 404,
      headers: { 'Content-Type': 'text/plain' }
    })
    // // 当回落的响应也不可用时，
    // // 我们便无能为力了，但我们始终需要
    // // 返回 Response 对象
  }
}

// 在任何情况下，我们会首先响应缓存的 URL 和网络请求的 URL 相匹配的资源：
self.addEventListener('fetch', (event) => {
  // console.log("CACHE_NAME", CACHE_NAME, event.request)
  if (!CACHE_NAME) {
    return
  }
  // console.log(event)
  // console.log(event.request)
  try {
    event.respondWith(
      cacheFirst({
        request: event.request,
        preloadResponsePromise: event.preloadResponse,
        event
      })
    )
  } catch (error) {
    console.error(error)
  }
})

const deleteCache = async (key) => {
  await caches.delete(key)
}
// 删除过时的版本
const deleteOldCaches = async () => {
  // console.log("CACHE_NAME", CACHE_NAME)
  const cacheKeepList = [CACHE_NAME]
  const keyList = await caches.keys()
  const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key))
  await Promise.all(cachesToDelete.map(deleteCache))
}
// 启用导航预加载
const enableNavigationPreload = async () => {
  // console.log("enableNavigationPreload")
  if (self.registration.navigationPreload) {
    await self.registration.navigationPreload.enable()
  }
}
self.addEventListener('activate', (event) => {
  if (!CACHE_NAME) {
    return
  }
  // console.log("CACHE_NAME", CACHE_NAME)
  event.waitUntil(enableNavigationPreload())
  event.waitUntil(deleteOldCaches())
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Clients/claim
  // uses claim() inside service worker's "activate" event listener so that clients loaded in the same scope do not need to be reloaded before their fetches will go through this service worker.
  event.waitUntil(
    self.clients.claim().then(() => {
      // 返回处理缓存更新的相关事情的 Promise
      console.info('clients.claim')
    })
  )
})
