// Dependencies: pnpm install lucide-react

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import UiDark from "/ui-dark.png";
import UiLight from "/ui-light.png";
import UiSystem from "/ui-system.png";
import { Check, Minus } from "lucide-react";
import { ElementRef, forwardRef, useMemo, useState } from "react";

const items = [
  { value: "light", label: "亮色主题", image: UiLight },
  { value: "dark", label: "暗黑主题", image: UiDark },
  { value: "system", label: "跟随系统", image: UiSystem },
];
interface ThemeRadioGroupProps {
  value?: string;
  onChange?: (value: string) => void;
}
const ThemeRadioGroup = forwardRef<
  ElementRef<typeof RadioGroup>,
  ThemeRadioGroupProps
>((props, ref) => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const mergedValue = useMemo(() => {
    return props.value ?? value;
  }, [value, props.value]);
  const mergedOnChange = useMemo(() => {
    return props.onChange ?? setValue;
  }, [setValue, props.onChange]);
  return (
    <fieldset className="space-y-4">
      <RadioGroup
        ref={ref}
        className="flex gap-3"
        value={mergedValue}
        onValueChange={mergedOnChange}
      >
        {items.map((item) => (
          <label key={item.value}>
            <RadioGroupItem
              id={item.value}
              value={item.value}
              className="peer sr-only after:absolute after:inset-0"
            />
            <img
              src={item.image}
              alt={item.label}
              width={88}
              height={70}
              className="relative cursor-pointer overflow-hidden rounded-lg border border-input shadow-sm shadow-black/5 outline-offset-2 transition-colors peer-[:focus-visible]:outline peer-[:focus-visible]:outline-2 peer-[:focus-visible]:outline-ring/70 peer-data-[disabled]:cursor-not-allowed peer-data-[state=checked]:border-ring peer-data-[state=checked]:bg-accent peer-data-[disabled]:opacity-50"
            />
            <span className="group mt-2 flex items-center gap-1 peer-data-[state=unchecked]:text-muted-foreground/70">
              <Check
                size={16}
                strokeWidth={2}
                className="peer-data-[state=unchecked]:group-[]:hidden"
                aria-hidden="true"
              />
              <Minus
                size={16}
                strokeWidth={2}
                className="peer-data-[state=checked]:group-[]:hidden"
                aria-hidden="true"
              />
              <span className="text-xs font-medium">{item.label}</span>
            </span>
          </label>
        ))}
      </RadioGroup>
    </fieldset>
  );
});
export default ThemeRadioGroup;
