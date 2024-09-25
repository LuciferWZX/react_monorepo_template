import request from "@/services/request.ts";
import { ResponseDataType } from "@/types";
import { IWorkspace } from "@/types/workspace.ts";

const PREFIX = "/api/workspace";

/**
 * @description 获取工作目录
 */
export const workspaces = async (): Promise<ResponseDataType<IWorkspace[]>> => {
  return request(`${PREFIX}`, {
    method: "get",
  });
};
