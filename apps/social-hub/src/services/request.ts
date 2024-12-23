import { extend, ResponseError } from "umi-request";
import store from "storejs";
import { StorageKey } from "@/types";
import { toast } from "sonner";
export interface ServerError {
  data: null;
  message: string;
  code: 401 | number;
}

const errorHandler = function (error: ResponseError<ServerError>) {
  if (error.response) {
    console.log(111, error.data);
    console.log(111, error.response);
    if (error.data) {
      //说明是服务器返回的
      return error.data;
    }
    //从服务器返回的错误
    const status = error.response.status;
    const statusText = error.response.statusText;
    switch (status) {
      case 401: {
        break;
      }
      case 500: {
        toast.error(`远程服务器出错：${statusText}`, {
          position: "top-center",
          richColors: true,
          id: "net_error",
        });
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
  const token: string | null = store.get(StorageKey.token);
  const headers: Record<string, any> = options.headers || {};
  if (token) {
    headers["authorization"] = `Bearer ${token}`;
  }
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
