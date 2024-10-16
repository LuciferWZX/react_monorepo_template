import { cn } from "@/lib/utils.ts";
import { forwardRef, InputHTMLAttributes, useContext, useState } from "react";
import { SizeType } from "@/components/config-provider/SizeContext.tsx";
import { DisabledContext } from "@/components/config-provider/DisabledContext.tsx";
import useSize from "@/components/config-provider/hooks/useSize.ts";
import { CircleX } from "lucide-react";
interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "value"> {
  size?: SizeType;
  disabled?: boolean;
  allowClear?: boolean;
  value?: string;
}
interface TextInputProps extends InputProps {}
const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    size,
    value,
    onChange,
    disabled: customDisabled,
    className,
    allowClear,
    ...restProps
  } = props;
  const [val, setVal] = useState<string>("");
  const mergedValue = value ?? val;
  const disabled = useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;
  const mergedSize = useSize((ctxSize) => size ?? ctxSize) ?? "middle";

  return (
    <span
      className={cn(
        "inline-flex items-center h-8 w-full rounded-md border border-border px-3 py-1 text-sm shadow-sm transition-colors  placeholder:text-muted-foreground  has-[input:disabled]:cursor-not-allowed  has-[input:disabled]:bg-muted",
        "has-[input:focus]:border-primary",
        {
          "h-6 py-0 px-2": mergedSize === "small",
        },
        {
          "h-10 py-2 text-base": mergedSize === "large",
        },
        className,
      )}
    >
      <input
        value={mergedValue}
        onChange={(event) => {
          if (onChange) {
            onChange?.(event);
          }
          setVal(event.target.value);
        }}
        disabled={mergedDisabled}
        ref={ref}
        className={cn(
          "flex-1 outline-none bg-transparent disabled:cursor-not-allowed",
        )}
        {...restProps}
      />
      <span className={"flex flex-shrink-0 items-center w-4 ms-1"}>
        {mergedValue && mergedValue.length > 0 && (
          <button
            onClick={() => {
              console.log(111, ref);
            }}
            className={cn(
              " cursor-pointer rounded-full h-4 w-4 hover:bg-muted hover:text-foreground text-muted-foreground",
            )}
          >
            <CircleX className={cn("h-full w-full")} />
          </button>
        )}
      </span>
    </span>
  );
  // return (
  //   <div className={"flex flex-col w-fit gap-1"}>
  //     {label && (
  //       <label
  //         className={cn(
  //           "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  //         )}
  //         {...labelProps}
  //       >
  //         {label}
  //       </label>
  //     )}
  //     <input
  //       {...inputProps}
  //       ref={ref}
  //       className={cn(
  //         "flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors  placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50 outline-none",
  //         "focus:border-primary",
  //         inputProps.className,
  //       )}
  //     />
  //     {props.description && (
  //       <div {...descriptionProps} style={{ fontSize: 12 }}>
  //         {props.description}
  //       </div>
  //     )}
  //     {isInvalid && (
  //       <div {...errorMessageProps} style={{ color: "red", fontSize: 12 }}>
  //         {validationErrors.join(" ")}
  //       </div>
  //     )}
  //   </div>
  // );
});
export default TextInput;
