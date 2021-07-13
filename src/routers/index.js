import { createRouter, createWebHistory } from 'vue-router'
import { routersLibrary } from "./configure.json";
import Home from "../views/Home";
import Layout from "@/layouts/MainLayout.vue";
const NotFoundComponent = { template: '<p>Page not found</p>' }

/**
 * 写在views下的index.vue文件会自动匹配到路径,去隔壁configure.json配置下信息就能自动展示了
 */

const ctx = require.context('../views/', true, /\index.vue$/)
const map = {}
for (const key of ctx.keys()) {
  const keyArr = key.split('/')
  keyArr.shift() // 移除. 
  const way = keyArr.join('/').replace(/\/index.vue$/g, '') // 生成路由路径
  if (way) {
    map[way] = ctx(key).default
  }
}

const routes = [
  { path: '/home', component: Home },
  { path: '/', component: Home },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundComponent },
]

const filterRouters = (arr, child) => {
  const returnArray = []
  arr.forEach((item) => {
    const { pathKey, name, icon, children, path } = item;
    const baseInfo = {
      path,
      name: path,
      component: map[pathKey] || Layout,
      // redirect: children ? "noRedirect" : "", // 项目自定义属性
      // alwaysShow: children ? true : false,   // 项目自定义属性
      meta: { title: name, icon, noCache: true, affix: true },
    }

    if (!children && !child) { //单层路由
      returnArray.push({
        ...baseInfo,
        redirect: path,
        component: Layout,
        children: [
          {
            ...baseInfo,
          }
        ]
      })
    } else if (children) { //多层嵌套
      let childrenArr = null
      if (children) {
        childrenArr = filterRouters(children, "child")
      }
      returnArray.push({
        ...baseInfo,
        children: childrenArr
      })
    } else { //叶子节点
      returnArray.push({
        ...baseInfo,
      })
    }
  })
  return returnArray;
}

const routerArr = filterRouters(routersLibrary);
routes.push(...routerArr)

const routers = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})
// const Router = new VueRouter({
//   base: process.env.BASE_URL,

// })

export default routers;