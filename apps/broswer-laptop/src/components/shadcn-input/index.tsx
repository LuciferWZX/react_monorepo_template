import { cn, Input, InputProps } from "@zhixin/shadcn_lib";
import { useContext, useMemo } from "react";
import DisabledContext from "antd/es/config-provider/DisabledContext";
import { Form } from "antd";

const ShadcnInput = (props: InputProps) => {
  const { disabled, className, ...restProps } = props;
  const disabledContent = useContext(DisabledContext);
  const { status } = Form.Item.useStatus();

  const isError = useMemo(() => status === "error", [status]);
  const mergedDisabled = useMemo(
    () => disabled || disabledContent,
    [disabledContent, disabled],
  );
  return (
    <Input
      disabled={mergedDisabled}
      className={cn(
        {
          "border-error  focus-visible:ring-error": isError,
        },
        className,
      )}
      {...restProps}
    />
  );
};
export default ShadcnInput;
