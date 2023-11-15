/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-13 17:47:44
 * @LastEditTime: 2023-11-15 09:26:59
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \deal-front-end\src\utils\index.ts
 * 
 */
import type { HttpResponse, RequestParams } from "@/api/api.auto";
import type { ServerResponseBaseType } from "@/type";
interface ApiRequest<P, Data> {
  (props: P, params?: RequestParams): Promise<
    HttpResponse<
      any,
      void
    >
  >;
}
// 创建一个request请求
export function createApiAction<P, S>(apiFn: ApiRequest<P, S>) {
  return async (props: P): Promise<S | undefined> => {
    let Response: ServerResponseBaseType<S>
    try {
      Response = await apiFn(props)
      return Response;
    } catch (error: any) {
      if (Response || error.url) {
        const err = Response || error
        alert(`${err.url, err.error?.message || err.statusText}`)
      } else {
        console.error(Response, error)
      }
    }
  };
}

