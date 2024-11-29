import store from "storejs";
import { ConstantManager } from "./ConstantManager.ts";
import { AuthStatusCode, ResponseCode } from "@/types";
import { ServiceManager } from "@/instances/ServiceManager.ts";

export class AuthManager {
  /**
   * @description 请求传入header如果用户token存在，就设置authorization
   * @param headers
   */
  public static attachAuth(headers?: HeadersInit) {
    const token: string | null = store.get(ConstantManager.TOKEN);
    const _headers: Record<string, any> = headers || {};
    if (token) {
      _headers["authorization"] = `Bearer ${token}`;
    }
    return _headers;
  }

  /**
   * @description 验证用户是否有效
   */
  public static async verifyAuth() {
    const token: string | null = store.get(ConstantManager.TOKEN);
    if (!token) {
      return {
        code: AuthStatusCode.not_log_in,
        user: null,
        message: "用户未登录",
      };
    }
    const response = await ServiceManager.authService.profile();
    if (response.code === ResponseCode.success) {
      return {
        code: AuthStatusCode.success,
        user: response.data,
        message: "验证成功",
      };
    }
    return {
      code: AuthStatusCode.failed,
      user: null,
      message: response.message,
    };
  }
}
