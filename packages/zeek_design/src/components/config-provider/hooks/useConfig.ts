import { useContext } from "react";
import { DisabledContext } from "../DisabledContext.tsx";
import { SizeContext } from "../SizeContext.tsx";

export function useConfig() {
  const componentDisabled = useContext(DisabledContext);
  const componentSize = useContext(SizeContext);
  return {
    componentDisabled,
    componentSize,
  };
}
