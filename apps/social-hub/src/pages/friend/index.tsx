import FriendSidebar from "@/pages/friend/FriendSidebar.tsx";
import { useMemo, useState } from "react";
import FriendSimpleInfo from "@/pages/friend/FriendSimpleInfo.tsx";
import { useAppStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";

const FriendPage = () => {
  const [recordId, setRecordId] = useState<string | null>(null);
  const friendRecords = useAppStore(useShallow((state) => state.friendRecords));
  // const [curRecord, setCurRecord] = useState<FriendRequestRecord | null>(null);
  const curRecord = useMemo(() => {
    return friendRecords.find((fr) => fr.id === recordId) ?? null;
  }, [recordId, friendRecords]);
  return (
    <div className={"h-full relative flex"}>
      <div className={"flex-shrink-0"}>
        <FriendSidebar recordId={recordId} setRecordId={setRecordId} />
      </div>
      <div className={"flex-1 overflow-auto"}>
        <FriendSimpleInfo curRecord={curRecord} />
      </div>
    </div>
  );
};
export default FriendPage;
