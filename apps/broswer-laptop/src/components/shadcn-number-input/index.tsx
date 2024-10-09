import { cn, Input, InputProps } from "@zhixin/shadcn_lib";
import { HTMLAttributes, useContext, useMemo, useRef } from "react";
import DisabledContext from "antd/es/config-provider/DisabledContext";
import { Form } from "antd";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useButton, useLocale, useNumberField } from "react-aria";
import { useNumberFieldState } from "react-stately";
import { NumberFieldProps } from "@react-types/numberfield";
import { AriaButtonOptions } from "@react-aria/button";

const ShadcnNumberInput = (
  props: Omit<InputProps, "onChange" | "value"> & {
    // value?: number;
    // onChange?: (val?: number) => void;
  } & NumberFieldProps,
) => {
  const { disabled, className } = props;
  const { locale } = useLocale();
  const state = useNumberFieldState({ ...props, locale });
  const inputRef = useRef(null);
  const {
    groupProps,
    inputProps: _inputProps,
    incrementButtonProps,
    decrementButtonProps,
  } = useNumberField(props, state, inputRef);
  const { value, ...inputProps } = _inputProps;
  const disabledContent = useContext(DisabledContext);
  const { status } = Form.Item.useStatus();

  const isError = useMemo(() => status === "error", [status]);
  const mergedDisabled = useMemo(
    () => disabled || disabledContent,
    [disabledContent, disabled],
  );
  // const handleSupportButton = (mode: "up" | "down") => {
  //   if (value === undefined) {
  //     onChange?.(0);
  //     return;
  //   }
  //   const { step } = props;
  //   match(mode)
  //     .with("up", () => {
  //       onChange?.(Number(value ?? 0) + Number(step ?? 1));
  //     })
  //     .with("down", () => {
  //       onChange?.(Number(value ?? 0) - Number(step ?? 1));
  //     });
  // };
  const renderAppearance = () => {
    return (
      <div
        className={
          "absolute h-full right-0 top-0 flex flex-col border-l rounded-tr-md rounded-br-md overflow-clip"
        }
      >
        <Button
          {...incrementButtonProps}
          className={cn(
            " flex-1 w-5 hover:bg-muted flex items-center justify-center  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          )}
        >
          <ChevronUp className={"w-3 h-3"} />
        </Button>
        <Button
          {...decrementButtonProps}
          className={cn(
            "flex-1 w-5 hover:bg-muted flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          )}
        >
          <ChevronDown className={"w-3 h-3"} />
        </Button>
      </div>
    );
  };
  return (
    <div {...groupProps} className={cn("relative", groupProps.className)}>
      <Input
        disabled={mergedDisabled}
        ref={inputRef}
        {...inputProps}
        value={value === undefined ? "" : value}
        className={cn(
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ",
          {
            "border-error focus-visible:ring-error": isError,
          },
          className,
          inputProps.className,
        )}
      />
      {renderAppearance()}
    </div>
  );
};
function Button(
  props: HTMLAttributes<HTMLButtonElement> & AriaButtonOptions<"button">,
) {
  const { className } = props;
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);
  return (
    <button
      {...buttonProps}
      className={cn(className, buttonProps.className)}
      ref={ref}
    >
      {props.children}
    </button>
  );
}
export default ShadcnNumberInput;
