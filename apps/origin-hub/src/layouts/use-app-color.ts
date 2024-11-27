import { useEventBus } from "@/hooks";
import { ConstantManager } from "@/instances/ConstantManager.ts";
import { useLayoutEffect, useState } from "react";
import { useExternal } from "ahooks";
import { getAppColor } from "@/lib/utils.ts";

/**
 * @description 用来处理主题颜色的hooks
 */
const useAppColor = () => {
  const [cssPath, setCssPath] = useState<string>("");
  useExternal(cssPath);
  const resourcePath = (color: string) => `/preset_css/origin_${color}.css`;
  useLayoutEffect(() => {
    const color = getAppColor();
    if (color !== "blue") {
      setCssPath(resourcePath(color));
    }
  }, []);
  useEventBus(
    ConstantManager.SWITCH_APP_COLOR,
    (color: string | null | undefined) => {
      if (!color || color === "blue") {
        setCssPath("");
        return;
      }
      setCssPath(resourcePath(color));
    },
  );
};
export default useAppColor;
