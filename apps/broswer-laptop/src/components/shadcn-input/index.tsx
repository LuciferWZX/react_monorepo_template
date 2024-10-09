import { cn, Input, InputProps } from "@zhixin/shadcn_lib";
import { useContext, useMemo } from "react";
import DisabledContext from "antd/es/config-provider/DisabledContext";
import { Form } from "antd";

const ShadcnInput = (
  props: Omit<InputProps, "onChange" | "value"> & {
    value?: string | number;
    onChange?: (val?: string | number) => void;
  },
) => {
  const { disabled, value, onChange, min, max, className, ...restProps } =
    props;
  const disabledContent = useContext(DisabledContext);
  const { status } = Form.Item.useStatus();

  const isError = useMemo(() => status === "error", [status]);
  const mergedDisabled = useMemo(
    () => disabled || disabledContent,
    [disabledContent, disabled],
  );
  return (
    <div className={"relative"}>
      <Input
        disabled={mergedDisabled}
        value={value === undefined ? "" : value}
        className={cn(
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ",
          {
            "border-error focus-visible:ring-error": isError,
          },
          className,
        )}
        onChange={(event) => onChange?.(event.target.value)}
        {...restProps}
      />
    </div>
  );
};
export default ShadcnInput;
