"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn-component";
import { Button } from "@/components";
import { ReactNode, useContext, useMemo } from "react";
import { DisabledContext } from "@/components/config-provider/DisabledContext.tsx";

interface SelectItemType {
  value: any;
  label?: string;
  render?: string | ReactNode;
}
interface ComboboxProps {
  option?: SelectItemType[];
  placeholder?: ReactNode;
  searchPlaceholder?: string;
  renderEmpty?: ReactNode;
  value?: any;
  onChange?: (val: any) => void;
  loading?: boolean;
  disabled?: boolean;
}
export function Combobox(props: ComboboxProps) {
  const {
    option,
    onChange,
    value: customValue,
    placeholder = "请选择",
    searchPlaceholder = "请输入关键词",
    renderEmpty,
    loading,
    disabled: customDisabled,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<any>(undefined);
  const mergedValue = customValue ?? value;
  const mergedOnChange = onChange ?? setValue;
  const disabled = useContext(DisabledContext);
  const mergedDisabled = loading === true ? true : (customDisabled ?? disabled);
  const renderValue = useMemo(() => {
    const target = option?.find((framework) => framework.value === mergedValue);
    if (target) {
      return target.render ?? target.label ?? target.value;
    }
    return <span className={"text-muted-foreground"}>{placeholder}</span>;
  }, [option, placeholder, mergedValue]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger disabled={mergedDisabled} asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          type={"default"}
          className={cn("justify-between")}
          icon={
            <ChevronDown
              className={cn("transition-all", {
                "rotate-180": open,
              })}
            />
          }
          iconPosition={"end"}
        >
          {renderValue}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command
          filter={(value, search, keywords) => {
            const extendValue = value + " " + keywords?.join(" ");
            if (extendValue.includes(search)) return 1;
            return 0;
          }}
        >
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            {renderEmpty ?? <CommandEmpty>{"暂无数据"}</CommandEmpty>}
            <CommandGroup>
              {option?.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.value}
                  keywords={[opt.label ?? ""]}
                  onSelect={(currentValue) => {
                    mergedOnChange(
                      currentValue === mergedValue ? undefined : currentValue,
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === opt.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {opt.render ?? opt.label ?? opt.value}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
