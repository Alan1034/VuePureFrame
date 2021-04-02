import { createRouter, createWebHistory  } from 'vue-router'
import Home from "../views/Home";
const NotFoundComponent = { template: '<p>Page not found</p>' }


const routes = [
  { path: '/home', component: Home },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundComponent },
]

const routers = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})
// const Router = new VueRouter({
//   base: process.env.BASE_URL,

// })

export default routers;