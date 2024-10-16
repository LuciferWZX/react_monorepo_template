import { FC, ReactNode } from "react";
import { DisabledContextProvider } from "./DisabledContext.tsx";
import { useConfig } from "./hooks/useConfig.ts";
import {
  SizeContextProvider,
  SizeType,
} from "@/components/config-provider/SizeContext.tsx";
// import { ConfigConsumerProps } from "@/components/config-provider/context.ts";

interface ConfigProviderProps {
  componentDisabled?: boolean;
  componentSize?: SizeType;
  children?: ReactNode;
}
type ProviderChildrenProps = ConfigProviderProps;
const ProviderChildren: FC<ProviderChildrenProps> = (props) => {
  const { children, componentDisabled, componentSize } = props;
  let childNode = <>{children}</>;
  if (componentDisabled !== void 0) {
    childNode = (
      <DisabledContextProvider disabled={componentDisabled}>
        {childNode}
      </DisabledContextProvider>
    );
  }
  if (componentSize !== void 0) {
    childNode = (
      <SizeContextProvider size={componentSize}>
        {childNode}
      </SizeContextProvider>
    );
  }
  return childNode;
};
const ConfigProvider: FC<ConfigProviderProps> & {
  useConfig: typeof useConfig;
} = (props) => {
  return <ProviderChildren {...props} />;
};
ConfigProvider.useConfig = useConfig;
export default ConfigProvider;
