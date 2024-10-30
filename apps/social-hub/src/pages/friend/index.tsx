import FriendSidebar from "@/pages/friend/FriendSidebar.tsx";
import { useState } from "react";
import { FriendRequestRecord } from "@/types/friend.ts";
import FriendSimpleInfo from "@/pages/friend/FriendSimpleInfo.tsx";

const FriendPage = () => {
  const [curRecord, setCurRecord] = useState<FriendRequestRecord | null>(null);
  return (
    <div className={"h-full relative flex"}>
      <div className={"flex-shrink-0"}>
        <FriendSidebar curRecord={curRecord} setCurRecord={setCurRecord} />
      </div>
      <div className={"flex-1 overflow-auto"}>
        <FriendSimpleInfo curRecord={curRecord} />
      </div>
    </div>
  );
};
export default FriendPage;
