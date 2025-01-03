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
export type DataTableFileType = {
  id: string;
  name: string;
  createTime: Date;
  data: Record<string, any>[];
  updateTime: null | Date;
  creatorId: string;
};
