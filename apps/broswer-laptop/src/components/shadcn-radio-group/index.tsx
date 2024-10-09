import { cn, Label, RadioGroup, RadioGroupItem } from "@zhixin/shadcn_lib";
interface ShadcnRadioGroupProps {
  value?: string;
  defaultValue?: string;
  onChange?: (v: string) => void;
  options?: Array<{ label?: string; value: string; className?: string }>;
  direction?: "vertical" | "horizontal";
}
const ShadcnRadioGroup = (props: ShadcnRadioGroupProps) => {
  const { direction, options, defaultValue } = props;
  return (
    <RadioGroup
      className={cn({
        flex: direction === "horizontal",
      })}
      defaultValue={defaultValue}
    >
      {options?.map((option) => {
        return (
          <div
            key={option.value}
            className={cn("flex items-center space-x-2", option.className)}
          >
            <RadioGroupItem value={option.value} />
            <Label>{option.label ?? option.value}</Label>
          </div>
        );
      })}
    </RadioGroup>
  );
};
export default ShadcnRadioGroup;
