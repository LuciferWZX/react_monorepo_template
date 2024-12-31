import { cn } from "@/lib/utils";
import {
  ComponentPropsWithoutRef,
  forwardRef,
  ReactNode,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { Input as SInput } from "@/components/ui/input.tsx";
import { CircleX, type LucideIcon } from "lucide-react";
interface InputProps
  extends Omit<ComponentPropsWithoutRef<typeof SInput>, "value" | "onChange"> {
  prefixIcon?: LucideIcon;
  suffixIcon?: LucideIcon;
  allowClear?: boolean;
  label?: ReactNode;
  overlapping?: boolean;
  classes?: {
    input?: string;
  };
  value?: string;
  onChange?: (val: string) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    classes,
    prefixIcon,
    suffixIcon,
    value,
    allowClear,
    onChange,

    overlapping,
    label,
    ...restProps
  } = props;
  const [inputValue, setInputValue] = useState(props.defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const mergedValue = useMemo(() => {
    return value ?? inputValue;
  }, [value, inputValue]);
  const id = useId();
  const mergedId = useMemo(() => {
    return props.id ?? id;
  }, [props.id, id]);
  return (
    <div className={cn("group relative", className)}>
      {overlapping && label && (
        <label
          htmlFor={mergedId}
          className={cn(
            "absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-xs font-medium text-foreground group-has-[:disabled]:opacity-50",
            {
              "text-destructive": !!props["aria-invalid"],
            },
          )}
        >
          {label}
        </label>
      )}
      <SInput
        ref={ref ?? inputRef}
        className={cn(
          "peer",
          {
            "ps-9": !!props.prefixIcon,
            "pe-9": !!props.suffixIcon,
            "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20":
              !!props["aria-invalid"],
          },
          classes?.input,
        )}
        value={mergedValue}
        onChange={(event) => {
          if (onChange) {
            onChange(event.target.value);
          }
          setInputValue(event.target.value);
        }}
        id={mergedId}
        {...restProps}
      />
      {props.prefixIcon && (
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <props.prefixIcon size={16} strokeWidth={2} />
        </div>
      )}
      {(props.suffixIcon || allowClear) && (
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={allowClear ? "Clear input" : "Submit search"}
          type="button"
          onClick={
            allowClear
              ? () => {
                  setInputValue("");
                  onChange?.("");
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }
              : undefined
          }
        >
          {allowClear && inputValue ? (
            <CircleX size={16} strokeWidth={2} aria-hidden="true" />
          ) : props.suffixIcon ? (
            <props.suffixIcon size={16} strokeWidth={2} aria-hidden="true" />
          ) : null}
        </button>
      )}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
