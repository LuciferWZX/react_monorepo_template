export enum AuthStatusCode {
  not_log_in,
  success,
  failed,
  request_failed,
}
export enum ResponseCode {
  success = 0,
  server_error = 500,
}
export type ResponseDataType<D> = {
  code: ResponseCode;
  message: string;
  data: D;
  success: boolean;
};
