import { extend, ResponseError } from "umi-request";
import { toast } from "sonner";
import { AuthManager } from "@/instances/AuthManager.ts";
import { match } from "ts-pattern";
import { Message } from "@/components";
import { RouterManager } from "@/instances/RouterManager.ts";
export interface ServerError {
  data: null;
  message: string;
  code: 401 | number;
}

const errorHandler = function (error: ResponseError<ServerError>) {
  if (!error.response) {
    throw error;
  }
  //从服务器返回的错误
  const status = error.response.status;
  if (error.response) {
    console.log("error.data:", error.data);
    console.log("error.response", error.response);
    if (error.data) {
      //说明是服务器返回的
      match(status).with(401, () => {
        //重新定位到登录页面
        RouterManager.navigate("/login");
      });
      toast.custom((t) => (
        <Message
          type={"error"}
          handleClose={() => toast.dismiss(t)}
          text={error.data.message}
        />
      ));
      return error.data;
    }

    const statusText = error.response.statusText;
    match(status).with(500, () => {
      toast.error(`远程服务器出错：${statusText}`, {
        position: "top-center",
        richColors: true,
        id: "net_error",
      });
    });
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
/**
 * @description 拦截发出的请求
 */
request.interceptors.request.use((url, options) => {
  const headers = AuthManager.attachAuth(options.headers);
  return {
    url,
    options: {
      ...options,
      headers,
    },
  };
});

/**
 * @description 拦截请求的返回
 */
request.interceptors.response.use(async (response: Response) => {
  //const data: ResponseDataType<any> = await response.clone().json();
  // match(data).with({ code: ResponseCode.server_error }, (_data) => {
  //   message.error({ content: response.url + "出错", key: "error" });
  // });
  return response;
});
export default request;
