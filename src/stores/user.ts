/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-20 11:03:45
 * @LastEditTime: 2024-08-09 16:04:53
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 储存用户信息
 * @FilePath: \deal-web\src\stores\user.ts
 *
 */
import { defineStore } from 'pinia'
import { createApiAction, gatewayParams } from '@/api'

export const useUserInfoStore = defineStore('userInfo', {
  state: () => {
    return {
      // 用户Token
      token: '',
      // 用户名
      name: '',
      // 用户id
      id: '',
      // 用户头像
      icon: null,
      // 系统角色，字典：sys_role_dictionary
      sys_role: -1 as number,
      // 计算登录过期时间
      timer: null as any,
      // 上次更新token的时间
      lastTimer: null as any,
      // 最后一次活动的时间
      lastMousemoveTime: new Date().valueOf()
    }
  },
  // 也可以定义为
  // state: () => ({ count: 0 })
  getters: {
    ifLoggedIn(state) {
      return state.token
    }
  },
  actions: {
    // 统一清理定时器
    clearTime() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = null
      this.lastMousemoveTime = new Date().valueOf()
    },
    // N秒不活动后登出
    resetLoginStatus() {
      this.clearTime()
      let lastTime = 0
      if (this.lastTimer) {
        lastTime = new Date().valueOf() - this.lastTimer
      }
      const timeout = 900 * 1000
      const restTimeout = timeout - lastTime > 0 ? timeout - lastTime : timeout
      this.timer = setTimeout(async () => {
        // console.log("跑完了")
        // 900秒超时
        const countTime = new Date().valueOf() - this.lastMousemoveTime
        if (timeout >= countTime) {
          try {
            // 刷新token
            const refeshCreate = createApiAction(gatewayParams).refreshCreate
            const res: any = await refeshCreate({})
            const { data } = res
            const { token } = data
            this.token = token
            this.lastTimer = new Date().valueOf()
            this.resetLoginStatus()
          } catch (error) {
            console.warn(error)
            this.resetStatus()
          }
        } else {
          // 重新登陆
          this.resetStatus()
        }
      }, restTimeout)
    },
    // 立即重置状态，退出登录
    resetStatus() {
      this.removeMonitoring()
      this.$reset()
    },
    moveing(e: any) {
      // console.log("keepAlive", e)
      this.lastMousemoveTime = new Date().valueOf()
    },
    // 监听鼠标状态判断用户是否活跃
    monitoringLoginStatus() {
      console.log('resetLoginStatus')
      this.resetLoginStatus()
      window.EventUtil.addHandler(window, 'mousemove', this.moveing)
      //移动端
      window.EventUtil.addHandler(window, 'touchstart', this.moveing)
    },
    // 取消监听鼠标状态判断用户是否活跃
    removeMonitoring() {
      window.EventUtil.removeHandler(window, 'mousemove', this.moveing)
      window.EventUtil.removeHandler(window, 'touchstart', this.moveing)
      // console.log("dead")
      this.clearTime()
    }
  },
  // 启用持久化存储
  persist: true
})
