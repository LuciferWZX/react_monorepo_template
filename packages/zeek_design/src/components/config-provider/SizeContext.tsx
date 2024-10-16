import { createContext, ReactNode, useContext } from "react";

export type SizeType = "small" | "middle" | "large" | undefined;
export const SizeContext = createContext<SizeType>(undefined);
export interface SizeContextProps {
  size?: SizeType;
  children?: ReactNode;
}
export const SizeContextProvider = (props: SizeContextProps) => {
  const { size, children } = props;
  const originSize = useContext<SizeType>(SizeContext);
  return (
    <SizeContext.Provider value={size || originSize}>
      {children}
    </SizeContext.Provider>
  );
};
export default SizeContext;
