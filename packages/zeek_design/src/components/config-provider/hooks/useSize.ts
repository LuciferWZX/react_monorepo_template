import { useContext, useMemo } from "react";
import SizeContext, {
  SizeType,
} from "@/components/config-provider/SizeContext.tsx";

const useSize = <T>(customSize?: T | ((ctxSize: SizeType) => T)): T => {
  const size = useContext<SizeType>(SizeContext);
  const mergedSize = useMemo(() => {
    if (!customSize) {
      return size as T;
    }
    if (customSize && typeof customSize === "string") {
      return customSize ?? size;
    }
    if (customSize instanceof Function) {
      return customSize(size);
    }
    return size as T;
  }, [customSize, size]);
  return mergedSize;
};
export default useSize;
