import request from "@/services/request.ts";
import { ResponseDataType } from "@/types";

const PREFIX = "/api/wuKong";
/**
 * 获取wukongim的链接ip的信息
 */
export const getIp = async (params: {
  uid: string;
}): Promise<
  ResponseDataType<{
    tcp_addr: string;
    ws_addr: string;
    wss_addr: string;
  }>
> => {
  return request(`${PREFIX}/ip`, {
    method: "get",
    params: { uid: params.uid },
  });
};
