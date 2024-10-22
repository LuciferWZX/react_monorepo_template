import { ReactNode, useContext, useState } from "react";
import { Checkbox } from "@/components";
import { cn } from "@/lib/utils.ts";
import { DisabledContext } from "@/components/config-provider/DisabledContext.tsx";

type CheckboxItemValue = number | string | boolean;
interface CheckBoxItem {
  value: CheckboxItemValue;
  label?: ReactNode;
  disabled?: boolean;
  title?: string;
}
interface CheckBoxGroupProps {
  value?: CheckboxItemValue[];
  option?: CheckBoxItem[];
  onChange?: (checked: CheckboxItemValue[]) => void;
  className?: string;
  disabled?: boolean;
}
const CheckBoxGroup = (props: CheckBoxGroupProps) => {
  const [value, setValue] = useState<CheckboxItemValue[]>([]);
  const {
    option,
    value: customValue,
    disabled: customDisabled,
    className,
    onChange,
  } = props;
  const mergedValue = customValue ?? value;
  const mergedOnChange = onChange ?? setValue;
  const disabled = useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;
  return (
    <div className={cn("gap-2 flex-wrap grid grid-cols-4", className)}>
      {option?.map((opt) => {
        const isChecked = mergedValue.includes(opt.value);
        const optDisabled = opt.disabled ?? mergedDisabled;
        return (
          <Checkbox
            key={opt.value.toString()}
            checked={isChecked}
            disabled={optDisabled}
            onCheckedChange={() => {
              if (isChecked) {
                mergedOnChange(mergedValue.filter((mv) => mv !== opt.value));
                setValue(mergedValue.filter((mv) => mv !== opt.value));
                return;
              }
              mergedOnChange(mergedValue.concat(opt.value));
              setValue(mergedValue.concat(opt.value));
            }}
          >
            {opt.label ?? opt.title ?? opt.value}
          </Checkbox>
        );
      })}
    </div>
  );
};
export default CheckBoxGroup;
