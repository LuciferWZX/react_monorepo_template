import { RefObject, useEffect } from "react";

import { debounce } from "es-toolkit";
import { isCollision } from "@/lib/utils.ts";

const useScroll = (
  messageListRef: RefObject<HTMLDivElement>,
  loaderDom: RefObject<HTMLDivElement>,
  config?: {
    hasMore?: boolean;
    getData?: () => Promise<void>;
  },
) => {
  const check = debounce(async (parent, target) => {
    if (!target || !parent) return;
    const r = isCollision(target, parent);
    if (r) {
      config?.getData?.();
    }
  }, 200);
  async function onScroll() {
    const listCurrent = messageListRef.current;
    const loaderCurrent = loaderDom.current;
    check(listCurrent, loaderCurrent);
  }
  const deScroll = debounce(onScroll, 200);
  useEffect(() => {
    const listCurrent = messageListRef.current;
    if (config?.hasMore === false) {
      listCurrent && listCurrent.removeEventListener("scroll", deScroll);
      return;
    }
    listCurrent && listCurrent.addEventListener("scroll", deScroll);
    return () => {
      listCurrent && listCurrent.removeEventListener("scroll", deScroll);
    };
  }, [config?.hasMore]);
};
export default useScroll;
