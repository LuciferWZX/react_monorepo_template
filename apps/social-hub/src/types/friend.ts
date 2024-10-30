export enum RequestStatus {
  accept = "accept",
  reject = "reject",
}

export interface FriendRequestRecord {
  id: string;
  uid: string;
  to: string;
  status: RequestStatus | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
