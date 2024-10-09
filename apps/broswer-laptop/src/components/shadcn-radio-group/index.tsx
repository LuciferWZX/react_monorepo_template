import { cn, Label, RadioGroup, RadioGroupItem } from "@zhixin/shadcn_lib";
import { nanoid } from "nanoid";
interface ShadcnRadioGroupProps {
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (v: string) => void;
  options?: Array<{
    label?: string;
    value: string;
    className?: string;
    disabled?: boolean;
  }>;
  direction?: "vertical" | "horizontal";
}
const ShadcnRadioGroup = (props: ShadcnRadioGroupProps) => {
  const { direction, value, onChange, options, disabled, defaultValue } = props;
  return (
    <RadioGroup
      className={cn({
        flex: direction === "horizontal",
      })}
      disabled={disabled}
      defaultValue={value ?? defaultValue}
      onValueChange={onChange}
    >
      {options?.map((option) => {
        const id = nanoid(10);
        const _disabled = option.disabled || disabled;
        return (
          <div
            key={option.value}
            className={cn("flex items-center space-x-2", option.className)}
          >
            <RadioGroupItem disabled={_disabled} value={option.value} id={id} />
            <Label
              className={cn({ "text-muted-foreground": _disabled })}
              htmlFor={id}
            >
              {option.label ?? option.value}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
};
export default ShadcnRadioGroup;
