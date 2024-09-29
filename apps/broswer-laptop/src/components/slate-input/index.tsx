import { ComponentPropsWithRef, useContext, useMemo } from "react";
import { cn, SlateProEditor } from "@zhixin/shadcn_lib";
import DisabledContext from "antd/es/config-provider/DisabledContext";
import { Form } from "antd";

interface SlateInputProps
  extends ComponentPropsWithRef<typeof SlateProEditor> {}
const SlateInput = (props: SlateInputProps) => {
  const { disabled, className, ...restProps } = props;
  const disabledContent = useContext(DisabledContext);
  const { status } = Form.Item.useStatus();

  const isError = useMemo(() => status === "error", [status]);
  const mergedDisabled = useMemo(
    () => disabled || disabledContent,
    [disabledContent, disabled],
  );
  return (
    <SlateProEditor
      className={cn(
        {
          "border-error focus-within:ring-error": isError,
        },
        className,
      )}
      classes={{
        count: cn({
          "text-error-foreground": isError,
        }),
      }}
      {...restProps}
      disabled={mergedDisabled}
    />
  );
};
export default SlateInput;
