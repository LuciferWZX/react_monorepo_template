import { ReactNode, useState } from "react";
import { Checkbox } from "@/components";

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
}
const CheckBoxGroup = (props: CheckBoxGroupProps) => {
  const [value, setValue] = useState<CheckboxItemValue[]>([]);
  const { option, value: customValue, onChange } = props;
  const mergedValue = customValue ?? value;
  const mergedOnChange = onChange ?? setValue;
  return (
    <div>
      {option?.map((opt) => {
        const isChecked = mergedValue.includes(opt.value);
        return (
          <Checkbox
            key={opt.value.toString()}
            checked={isChecked}
            onCheckedChange={() => {
              if (isChecked) {
                mergedOnChange(mergedValue.filter((mv) => mv !== opt.value));
                return;
              }
              mergedOnChange(mergedValue.concat(opt.value));
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
