/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2021-07-16 11:35:05
 * @LastEditTime: 2021-08-06 17:26:53
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \VuePureFrame\src\routers\index.js
 * 
 */
import { createRouter, createWebHistory } from 'vue-router'
import { routersLibrary } from "./configure.json";
const Home = () => import("../views/Home")
/* Layout */
const Layout = () => import("@/layouts/MainLayout.vue")
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
    const { pathKey, name, icon, children, path, hidden, meta } = item;
    const baseInfo = {
      path,
      name: path,
      component: () => Promise.resolve( //路由懒加载(动态导入)
        map[pathKey] || Layout,
      ),
      // redirect: children ? "noRedirect" : "", // 项目自定义属性
      // alwaysShow: children ? true : false,   // 项目自定义属性
      meta: { noCache: true, affix: false, ...meta, title: name, icon, }, //affix设置标签是否不可关闭,项目自定义属性
      hidden: hidden ? true : false
    }

    if (!children && !child) { //单层路由
      returnArray.push({
        ...baseInfo,
        component: Layout,
        redirect: path,
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