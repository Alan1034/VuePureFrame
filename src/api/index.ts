/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-15 15:49:59
 * @LastEditTime: 2024-11-21 11:29:54
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description:
 * @FilePath: \VuePureFrame\src\api\index.ts
 *
 */
import { Api as AutoApi } from './api.auto'
import { RSA_SIGN } from '@/utils/rsa'
import type { ApiConfig } from "./api.auto";
// import { useUserInfoStore } from '@/stores/user'
// import { ElMessage } from 'element-plus'

class Api extends AutoApi<unknown> {
  constructor(...props: ConstructorParameters<typeof AutoApi>) {
    super(...props)
    const originRequest = this.request
    // @ts-ignore
    this.request = (...args) => {
      const [params] = args
      console.log(props)
      return originRequest(...args).catch((error) => {
        if (error.url) {
          const err = error
          if (err.error) {
            const { code } = err.error
            console.log('code', code)
            if (`${code}` === '401') {
              // token失效需要重新登录
            }
          }
          alert(`${(err.url, err.error?.message || err.statusText)}`)
        } else {
          console.error(Response, error)
        }
      })
    }
  }
}

export const api = (params?: ApiConfig) => {
  let token
  try {
    token = JSON.parse(localStorage.getItem('userInfo') || '{}')
  } catch (error) {
    console.info(error)
  }

  return new Api({
    baseUrl: `/api`,
    baseApiParams: {
      headers: {
        'X-TOKEN': token
      },
    },
    ...params,
  })
}

export const apiParams = {
  baseUrl: "/api1",
}