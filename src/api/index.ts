/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-13 17:54:22
 * @LastEditTime: 2023-11-13 18:51:05
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \deal-front-end\src\api\index.ts
 * 
 */
import { Api as AutoApi } from "./api.auto";
import type { ServerResponseBaseType } from "./type";

class Api extends AutoApi<unknown> {
  constructor(...props: ConstructorParameters<typeof AutoApi>) {
    super(...props);
    // const originRequest = this.request;
    // this.request = (...args) => {
    //   const [params] = args;
    //   const onError = (params as ExtendedRequestParams | undefined)?.onError;
    //   return originRequest(...args).catch((err: ServerResponseBaseType) => {
    //     if (err.status !== 200) {
    //       apiEmitter.emit(ApiEventName.ResponseError, {
    //         message: "当前网络异常，请重试",
    //         code: err.status,
    //         onError
    //       });
    //     }
    //     if (err.code  && err.message ) {
    //       const { message, code, data } = err;
    //       apiEmitter.emit(ApiEventName.ResponseError, {
    //         message,
    //         code,
    //         data,
    //         onError,
    //       });
    //     }
    //     throw err;
    //   });
    // };
  }
}

export const api = new Api({
  baseUrl:"/api",
});
