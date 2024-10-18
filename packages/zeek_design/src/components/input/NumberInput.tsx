import { HTMLAttributes, useContext, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useButton, useLocale, useNumberField } from "react-aria";
import { useNumberFieldState } from "react-stately";
import { NumberFieldProps } from "@react-types/numberfield";
import { AriaButtonOptions } from "@react-aria/button";
import { InputProps } from "react-aria-components";
import { DisabledContext } from "@/components/config-provider/DisabledContext.tsx";
import { cn } from "@/lib/utils.ts";
import useSize from "@/components/config-provider/hooks/useSize.ts";
import { SizeType } from "@/components/config-provider/SizeContext.tsx";

const NumberInput = (
  props: Omit<InputProps, "onChange" | "value"> & {
    // value?: number;
    // onChange?: (val?: number) => void;
    size?: SizeType;
  } & NumberFieldProps,
) => {
  const { disabled: customDisabled, size, className } = props;
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
  const mergedSize = useSize((ctxSize) => size ?? ctxSize) ?? "middle";
  const disabled = useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;
  const renderAppearance = () => {
    return (
      <div
        className={
          "h-full flex flex-col border-l rounded-tr-md rounded-br-md overflow-clip"
        }
      >
        <Button
          {...incrementButtonProps}
          isDisabled={incrementButtonProps.isDisabled || mergedDisabled}
          className={cn(
            " flex-1 w-5 hover:bg-muted flex items-center justify-center  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          )}
        >
          <ChevronUp className={"w-3 h-3"} />
        </Button>
        <Button
          {...decrementButtonProps}
          isDisabled={decrementButtonProps.isDisabled || mergedDisabled}
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
    <span
      {...groupProps}
      className={cn(
        '"outline-none inline-flex items-center h-8 w-fit rounded-md border border-border  text-sm shadow-sm transition-colors  placeholder:text-muted-foreground  has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-muted-foreground  has-[input:disabled]:bg-muted',
        "has-[input:focus]:border-primary ",
        {
          "h-6": mergedSize === "small",
          "h-10 text-base": mergedSize === "large",
        },
        groupProps.className,
      )}
    >
      <span
        className={cn("px-3 py-1", {
          "py-0 px-2": mergedSize === "small",
          "py-2 text-base": mergedSize === "large",
        })}
      >
        <input
          {...inputProps}
          disabled={mergedDisabled}
          ref={inputRef}
          value={value === undefined ? "" : value}
          className={cn(
            "outline-none  bg-transparent disabled:cursor-not-allowed",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ",
            {
              "border-error focus-visible:ring-error": false,
            },
            className,
            inputProps.className,
          )}
        />
      </span>
      {renderAppearance()}
    </span>
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
export default NumberInput;
