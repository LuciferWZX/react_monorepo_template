import { extend, ResponseError } from "umi-request";
import { APPManager } from "@/managers";
import { match } from "ts-pattern";

export interface ServerError {
  data: null;
  message: string;
  code: 401 | number;
}

const errorHandler = function (error: ResponseError<ServerError>) {
  if (error.response) {
    if (error.data) {
      match(error.data.code).with(401, () => APPManager.shared.shutdown());
      throw error;
    }
    //从服务器返回的错误
    const status = error.response.status;
    switch (status) {
      case 401: {
        APPManager.shared.shutdown();
        break;
      }
      case 500: {
        // notification.error({
        //   message: "远程服务器出错",
        //   description: error.response.statusText,
        //   key: "ERROR",
        // });
        break;
      }
    }
  }
  if (error.type === "Timeout") {
    // notification.error({
    //   description: "请查看网络是否连接",
    //   message: "请求超时",
    //   key: "ERROR",
    // });
  }
  throw error;
};
const request = extend({
  // prefix: '/api',
  timeout: 1000 * 10,
  errorHandler: errorHandler,
});
request.interceptors.request.use((url, options) => {
  // const user: BaseUser | null = StorageManager.shared.get(
  //   APP_STORAGE_KEY.enterprise_user,
  // );
  const headers: Record<string, any> = options.headers || {};
  // if (user) {
  //   headers["authorization"] = `Bearer ${user.accessToken}`;
  // }
  return {
    url,
    options: {
      ...options,
      headers,
    },
  };
});
request.interceptors.response.use(async (response: Response) => {
  //const data: ResponseDataType<any> = await response.clone().json();
  // match(data).with({ code: ResponseCode.server_error }, (_data) => {
  //   message.error({ content: response.url + "出错", key: "error" });
  // });
  return response;
});
export default request;
