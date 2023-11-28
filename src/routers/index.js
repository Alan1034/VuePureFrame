/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2021-07-16 11:35:05
 * @LastEditTime: 2023-11-28 11:42:35
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \VuePureFrame\src\routers\index.js
 * 
 */
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { routersLibrary } from "./configure";
const Home = () => import("@/views/Home.vue")
/* Layout */
const Layout = () => import("@/layouts/RouterLayout.vue")
const NotFoundComponent = () => import("@/views/state/404/index.vue")

/**
 * 写在views下的index.vue文件会自动匹配到路径,去隔壁configure.json配置下信息就能自动展示了
 */

const modules = import.meta.glob('../views/**/index.vue')
// console.log(modules)
// const map = {}
for (const path in modules) {
  console.log(path)
  // modules[path]().then((mod) => {
  //   console.log(path, mod)

  // })
}
// console.log(map)
const routes = [
  { path: '/home', component: Home },
  { path: '/', component: Home },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundComponent },
]

const filterRouters = (arr) => {
  const returnArray = []
  arr.forEach((item) => {
    const { pathKey, name, children, path, hidden, meta } = item;
    const baseInfo = {
      path,
      name,
      component: () => Promise.resolve( //路由懒加载(动态导入)
        (pathKey && modules[pathKey]) ? modules[pathKey]() : Layout(),
      ),
      // redirect: children ? "noRedirect" : "", // 项目自定义属性
      // alwaysShow: children ? true : false,   // 项目自定义属性
      meta: { ...item, ...meta, },
      hidden: hidden ? true : false
    }
    if (children) { //多层嵌套
      let childrenArr = null
      if (children) {
        childrenArr = filterRouters(children)
      }
      // component 将被渲染到 父组件 的 <router-view> 内部
      //  详见：https://router.vuejs.org/zh/guide/essentials/nested-routes.html#%E5%B5%8C%E5%A5%97%E8%B7%AF%E7%94%B1
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
console.log(routerArr)
routes.push(...routerArr)
const routers = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  // history: createWebHistory(),
  history: createWebHashHistory(), //为了在github服务上展示，使用hashRouter
  routes, // `routes: routes` 的缩写
})
// const Router = new VueRouter({
//   base: process.env.BASE_URL,

// })

export default routers;