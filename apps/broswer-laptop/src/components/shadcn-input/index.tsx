import { cn, Input, InputProps } from "@zhixin/shadcn_lib";
import { useContext, useMemo } from "react";
import DisabledContext from "antd/es/config-provider/DisabledContext";
import { Form } from "antd";
import { ChevronDown, ChevronUp } from "lucide-react";
import { match } from "ts-pattern";

const ShadcnInput = (
  props: Omit<InputProps, "onChange" | "value"> & {
    value?: string | number;
    onChange?: (val: string | number) => void;
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
  const handleSupportButton = (mode: "up" | "down") => {
    console.log(444, value);
    if (value === undefined) {
      onChange?.(0);
      return;
    }
    const { step } = props;
    match(mode)
      .with("up", () => {
        console.log(333, value, step);
        onChange?.(Number(value ?? 0) + Number(step ?? 1));
      })
      .with("down", () => {
        onChange?.(Number(value ?? 0) - Number(step ?? 1));
      });
  };
  const renderAppearance = () => {
    return (
      <div
        className={
          "absolute h-full right-0 top-0 flex flex-col border-l rounded-tr-md rounded-br-md overflow-clip"
        }
      >
        <button
          type={"button"}
          onClick={() => handleSupportButton("up")}
          disabled={value !== "" && Number(value) >= Number(max)}
          className={cn(
            " flex-1 w-5 hover:bg-muted flex items-center justify-center  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          )}
        >
          <ChevronUp className={"w-3 h-3"} />
        </button>
        <button
          type={"button"}
          onClick={() => handleSupportButton("down")}
          disabled={value !== "" && Number(value) <= Number(min)}
          className={cn(
            "flex-1 w-5 hover:bg-muted flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          )}
        >
          <ChevronDown className={"w-3 h-3"} />
        </button>
      </div>
    );
  };
  return (
    <div className={"relative "}>
      <Input
        disabled={mergedDisabled}
        value={value}
        className={cn(
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ",
          {
            "border-error focus-visible:ring-error": isError,
          },
          className,
        )}
        onChange={(event) => {
          if (props.type === "number" && event.target.value !== "") {
            console.log(111, event.target.value);
            if (
              max !== undefined &&
              Number(Number(event.target.value) >= Number(max))
            ) {
              console.log(2);
              onChange?.(Number(max));
              return;
            }
            if (
              min !== undefined &&
              Number(Number(event.target.value) <= Number(min))
            ) {
              console.log(3);
              onChange?.(Number(min));
              return;
            }
            console.log(4, Number(event.target.value));
            onChange?.(Number(event.target.value));
            return;
          }
          console.log(5);
          onChange?.(event.target.value);
        }}
        {...restProps}
      />
      {props.type === "number" && renderAppearance()}
      {props.maxLength !== undefined && (
        <div className={"absolute right-0 text-muted-foreground"}>
          {props.value ? props.value.toString().length : 0} / {props.maxLength}
        </div>
      )}
    </div>
  );
};
export default ShadcnInput;
