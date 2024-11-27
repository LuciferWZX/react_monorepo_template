import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ElementRef, forwardRef, useMemo, useState } from "react";
import { cn } from "@/lib/utils.ts";

const COLORS = [
  { name: "红色", value: "red" },
  { name: "橙色", value: "orange" },
  { name: "黄色", value: "yellow" },
  { name: "绿色", value: "green" },
  { name: "蓝色", value: "blue" },
];
const COLOR_CLASSNAME: Record<any, any> = {
  red: `border-red-500 bg-red-500 data-[state=checked]:border-red-500 data-[state=checked]:bg-red-500`,
  orange: `border-orange-500 bg-orange-500 data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500`,
  yellow: `border-yellow-500 bg-yellow-500 data-[state=checked]:border-yellow-500 data-[state=checked]:bg-yellow-500`,
  green: `border-green-500 bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500`,
  blue: `border-blue-500 bg-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500`,
};
interface ColorRadioGroupProps {
  value?: string;
  onChange?: (value: string) => void;
}
const ColorRadioGroup = forwardRef<
  ElementRef<typeof RadioGroup>,
  ColorRadioGroupProps
>((props, ref) => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const mergedValue = useMemo(() => {
    return props.value ?? value;
  }, [value, props.value]);
  const mergedOnChange = useMemo(() => {
    return props.onChange ?? setValue;
  }, [setValue, props.onChange]);
  return (
    <RadioGroup
      ref={ref}
      className="flex gap-1.5"
      value={mergedValue}
      onValueChange={mergedOnChange}
    >
      {COLORS.map((color) => {
        return (
          <RadioGroupItem
            value={color.value}
            key={color.value}
            aria-label={color.name}
            className={cn(`size-6 shadow-none`, COLOR_CLASSNAME[color.value])}
          />
        );
      })}
    </RadioGroup>
  );
});
export default ColorRadioGroup;
