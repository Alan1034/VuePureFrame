/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-20 11:03:45
 * @LastEditTime: 2024-01-23 16:33:02
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 储存权限及角色字典
 * @FilePath: \deal-front-end\src\stores\permission.ts
 * 
 */
// import { defineStore } from 'pinia'
// import { useUserInfoStore } from '@/stores/user'
// type IndexRouterPermission = {
//   path: string, parentPath?: string, childList?: any[]
// }
// export const usePermissionStore = defineStore('permission', {
//   state: () => {
//     return {
//       permissions: <any>[]
//     }
//   },
//   getters: {
//     buttonPermission(state) {
//       return state.permissions.filter((item: any) => {
//         return item.permission_type === 0
//       })
//     },
//     buttonPermissionIDs(state: any) {
//       return state.buttonPermission.map((item: any) => {
//         return item.permission_id
//       })
//     },
//     routerPermission(state) {
//       return state.permissions.filter((item: any) => {
//         return item.permission_type === 1
//       })
//     },
//     fullRouterPermission(state: any) {
//       return state.routerPermission.map((item: any) => {
//         return item.permission_id
//       })
//     },
//     interfacePermission(state) {
//       return state.permissions.filter((item: any) => {
//         return item.permission_type === 2
//       })
//     },
//   },
//   actions: {
//     // 路由权限校验
//     /**
//      * @description: 
//      * @param {string} path
//      * @param {boolean} parentPath 模糊匹配，目前用于父级菜单的匹配
//      * @return {*}
//      */

//     indexRouterPermission(params: IndexRouterPermission) {
//       const { path, parentPath, childList } = params
//       const userInfo = useUserInfoStore()
//       const { sys_role } = userInfo
//       if (["/", "/home", "/search"].includes(path)) {
//         return true
//       }
//       if (path.match("/system/log")) {
//         // console.log(sys_role, "1")
//         if ([0, 2].includes(sys_role)) {
//           return true
//         }
//       }
//       if (path.match("/system")) {
//         // console.log(sys_role, "2")
//         if (sys_role == 0) {
//           return true
//         }
//       }
//       if (childList && childList.length > 0) {
//         let ifMatch = false
//         const childPaths = childList.map((item: any) => {
//           return typeof item === "string" ? item : item.path
//         })
//         childPaths.forEach((element: string) => {
//           if (this.fullRouterPermission.includes(element)) {
//             // console.log(this.fullRouterPermission)
//             // console.log(element)
//             ifMatch = true
//           }
//         });
//         if (ifMatch) {
//           return true
//         }
//       }
//       if (parentPath) {
//         if (this.fullRouterPermission.includes(parentPath)) {
//           return true
//         }
//       }
//       if (this.fullRouterPermission.includes(path)) {
//         return true
//       }
//       return false
//     },
//     // clearTime() {
//     //   if (this.timer) {
//     //     clearTimeout(this.timer)
//     //   }
//     //   this.timer = null
//     //   this.lastMousemoveTime = new Date().valueOf()
//     // },
//   },
//   // 启用持久化存储
//   persist: true,
// })