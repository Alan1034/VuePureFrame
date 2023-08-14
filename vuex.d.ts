/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-08-03 11:51:23
 * @LastEditTime: 2023-08-03 11:51:34
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \newvue3\vuex.d.ts
 * 
 */
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // 声明自己的 store state
  interface State {
    count: number
  }

  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}