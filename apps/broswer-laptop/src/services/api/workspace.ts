import request from "@/services/request.ts";
import { ResponseDataType } from "@/types";
import { IWorkspace, WorkspaceType } from "@/types/workspace.ts";

const PREFIX = "/api/workspace";

/**
 * @description 获取工作目录
 */
export const workspaces = async (): Promise<ResponseDataType<IWorkspace[]>> => {
  return request(`${PREFIX}`, {
    method: "get",
  });
};
/**
 * 新建工作目录或者工作文件
 * @param data
 */
export const addWorkspace = async (data: {
  name: string;
  type: WorkspaceType;
  parentId?: string;
}): Promise<ResponseDataType<null>> => {
  return request(`${PREFIX}/create`, {
    method: "post",
    data,
  });
};
/**
 * 批量删除文件或者文件夹
 * @param data
 */
export const batchDeleteWorkspace = async (data: {
  ids: string[];
}): Promise<ResponseDataType<null>> => {
  return request(`${PREFIX}/delete`, {
    method: "post",
    data,
  });
};
