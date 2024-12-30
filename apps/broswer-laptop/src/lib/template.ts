export interface TableHeaderConfig {
  title: string;
  id: string;
}
export type DataFileType = {
  id: string;
  name: string;
  headers: TableHeaderConfig[];
  data: any[];
  createTime: Date;
  updateTime: null | Date;
  creator: {
    id: string;
    username: string;
    nickname: string;
    avatar: string;
  };
};
