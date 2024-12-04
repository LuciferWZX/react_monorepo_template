import { RefObject, useEffect } from "react";
import { debounce } from "lodash-es";
import { isCollision } from "@/lib/utils.ts";
import { Conversation } from "wukongimjssdk";
import { useLatest } from "ahooks";

export const useListScroll = (
  messageListRef: RefObject<HTMLDivElement> | null,
  loaderDom: RefObject<HTMLDivElement> | null,
  config?: {
    hasMore?: boolean;
    getData?: () => Promise<void>;
    conversation: Conversation;
  },
) => {
  const getDataRef = useLatest(config?.getData);
  const checkFn = debounce(async (parent, target) => {
    if (!target || !parent) return;
    const r = isCollision(target, parent);
    if (r) {
      getDataRef.current?.();
    }
  }, 200);
  async function onScroll() {
    const listCurrent = messageListRef?.current;
    const loaderCurrent = loaderDom?.current;
    await checkFn(listCurrent, loaderCurrent);
  }
  const debounceScroll = debounce(onScroll, 200);
  useEffect(() => {
    const listCurrent = messageListRef?.current;
    if (config?.hasMore === false) {
      listCurrent && listCurrent.removeEventListener("scroll", debounceScroll);
      return;
    }
    if (listCurrent && listCurrent.scrollTop === 0) {
      requestAnimationFrame(() => debounceScroll());
    }
    listCurrent && listCurrent.addEventListener("scroll", debounceScroll);
    return () => {
      listCurrent && listCurrent.removeEventListener("scroll", debounceScroll);
    };
  }, [config?.hasMore, config?.conversation.channel.channelID]);
};
