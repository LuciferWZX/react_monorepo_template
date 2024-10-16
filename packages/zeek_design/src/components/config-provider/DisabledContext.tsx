import { createContext, ReactNode, useContext } from "react";

export const DisabledContext = createContext<boolean>(false);
export interface DisabledContextProps {
  disabled?: boolean;
  children?: ReactNode;
}

export const DisabledContextProvider = (props: DisabledContextProps) => {
  const { disabled, children } = props;
  const originDisabled = useContext(DisabledContext);
  return (
    <DisabledContext.Provider value={disabled ?? originDisabled}>
      {children}
    </DisabledContext.Provider>
  );
};
