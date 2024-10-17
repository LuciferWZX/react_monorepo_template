import { cn } from "@/lib/utils.ts";
import {
  forwardRef,
  InputHTMLAttributes,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { SizeType } from "@/components/config-provider/SizeContext.tsx";
import { DisabledContext } from "@/components/config-provider/DisabledContext.tsx";
import useSize from "@/components/config-provider/hooks/useSize.ts";
interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "value"> {
  size?: SizeType;
  disabled?: boolean;
  value?: string;
}
type TextInputProps = InputProps;
interface TextInputRef {
  focus: () => void;
  blur: () => void;
}
const TextInput = forwardRef<TextInputRef, TextInputProps>((props, ref) => {
  const {
    size,
    value,
    onChange,
    disabled: customDisabled,
    className,
    ...restProps
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [val, setVal] = useState<string>("");
  const mergedValue = value ?? val;
  const disabled = useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;
  const mergedSize = useSize((ctxSize) => size ?? ctxSize) ?? "middle";
  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        inputRef.current?.focus();
      },
      blur: () => {
        inputRef.current?.blur();
      },
    } as TextInputRef;
  });
  return (
    <span
      className={cn(
        "inline-flex items-center h-8 w-full rounded-md border border-border px-3 py-1 text-sm shadow-sm transition-colors  placeholder:text-muted-foreground  has-[input:disabled]:cursor-not-allowed  has-[input:disabled]:bg-muted has-[input:disabled]:text-muted-foreground",
        "has-[input:focus]:border-primary",
        {
          "h-6 py-0 px-2": mergedSize === "small",
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
        ref={inputRef}
        className={cn(
          "flex-1 outline-none bg-transparent disabled:cursor-not-allowed",
        )}
        {...restProps}
      />
      {/*<span className={"flex flex-shrink-0 items-center w-4 ms-1"}>*/}
      {/*  {mergedValue && mergedValue.length > 0 && (*/}
      {/*    <button*/}
      {/*      onClick={() => {*/}
      {/*        console.log(111, ref.current);*/}
      {/*        if (ref.current) {*/}
      {/*          ref.current.value = "";*/}
      {/*        }*/}
      {/*        // if (onChange) {*/}
      {/*        //   onChange(ref.current.); // 在点击按钮时将输入框的值设置为空字符串*/}
      {/*        // }*/}
      {/*        // setVal(""); // 同时更新 val 的值*/}
      {/*      }}*/}
      {/*      className={cn(*/}
      {/*        " cursor-pointer rounded-full h-4 w-4 hover:bg-muted hover:text-foreground text-muted-foreground",*/}
      {/*      )}*/}
      {/*    >*/}
      {/*      <CircleX className={cn("h-full w-full")} />*/}
      {/*    </button>*/}
      {/*  )}*/}
      {/*</span>*/}
    </span>
  );
});
export default TextInput;
