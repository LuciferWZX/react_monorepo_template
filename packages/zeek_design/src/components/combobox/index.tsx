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
import {
  CSSProperties,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DisabledContext } from "@/components/config-provider/DisabledContext.tsx";
import { match, P } from "ts-pattern";
import { SizeType } from "@/components/config-provider/SizeContext.tsx";
import useSize from "@/components/config-provider/hooks/useSize.ts";

interface SelectItemType {
  value: any;
  label?: string;
  render?: string | ReactNode;
  disabled?: boolean;
}
interface SelectGroupItemType {
  label?: ReactNode;
  title?: string;
  options: SelectItemType[];
}
type SelectOptionType = SelectGroupItemType | SelectItemType;
interface ComboboxProps {
  option?: SelectOptionType[];
  placeholder?: ReactNode;
  className?: string;
  style?: CSSProperties;
  searchPlaceholder?: string;
  renderEmpty?: ReactNode;
  value?: any;
  onChange?: (val: any) => void;
  loading?: boolean;
  disabled?: boolean;
  showSearch?: boolean;
  popupMatchSelectWidth?: boolean;
  size?: SizeType;
  labelRender?: (
    value: any,
    selectedItem: SelectItemType | undefined,
    isOpen: boolean,
  ) => ReactNode;
}
export function Combobox(props: ComboboxProps) {
  const {
    option,
    onChange,
    value: customValue,
    placeholder = "请选择",
    searchPlaceholder = "请输入关键词",
    renderEmpty,
    size,
    loading,
    disabled: customDisabled,
    popupMatchSelectWidth = true,
    labelRender,
    className,
    style,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<any>(undefined);
  const mergedValue = customValue ?? value;
  const [width, setWidth] = useState<number | undefined>(undefined);
  const displayValueRef = useRef<HTMLButtonElement>(null);
  const mergedOnChange = onChange ?? setValue;
  const disabled = useContext(DisabledContext);
  const mergedDisabled = loading === true ? true : (customDisabled ?? disabled);
  const mergedSize = useSize((ctxSize) => size ?? ctxSize) ?? "middle";
  const renderValue = useMemo(() => {
    const target = option?.find((opt) => {
      return match(opt)
        .with({ options: P.nonNullable }, (_opt) => {
          return _opt.options.find((__opt) => __opt.value === mergedValue);
        })
        .otherwise((_opt) => {
          return _opt.value === mergedValue;
        });
    });
    return match(target)
      .with({ options: P.nonNullable }, (_target) => {
        const opt = _target.options.find((_opt) => _opt.value === mergedValue)!;
        return opt.render ?? opt.label ?? opt.value;
      })
      .with(undefined, () => {
        return <span className={"text-muted-foreground"}>{placeholder}</span>;
      })
      .otherwise((_target) => {
        return _target.render ?? _target.label ?? _target.value;
      });
  }, [option, placeholder, mergedValue]);
  const renderOptionItem = (opt: SelectItemType) => {
    return (
      <CommandItem
        key={opt.value}
        value={opt.value}
        componentSize={mergedSize}
        disabled={opt.disabled}
        keywords={[opt.label ?? ""]}
        className={" flex"}
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
            mergedValue === opt.value ? "opacity-100" : "opacity-0",
          )}
        />
        <label className={"flex-1 truncate"}>
          {opt.render ?? opt.label ?? opt.value}
        </label>
      </CommandItem>
    );
  };
  const getSelectedItem = (_value: any) => {
    let selectedItem: SelectItemType | undefined = undefined;
    for (let i = 0; i < (option?.length ?? 0); i++) {
      const opt = option?.[i];
      if (opt) {
        match(opt)
          .with({ options: P.nonNullable }, (_opt) => {
            _opt.options.forEach((__opt) => {
              if (__opt === _value) {
                selectedItem = __opt;
              }
            });
          })
          .otherwise((_opt) => {
            if (_opt === _value) {
              selectedItem = _opt;
            }
          });
      }
    }
    return selectedItem;
  };
  useEffect(() => {
    if (popupMatchSelectWidth) {
      setWidth(displayValueRef.current?.clientWidth);
    }
  }, [popupMatchSelectWidth, mergedValue, open]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger disabled={mergedDisabled} asChild>
        {labelRender ? (
          labelRender(mergedValue, getSelectedItem(mergedValue), open)
        ) : (
          <Button
            ref={displayValueRef}
            role="combobox"
            aria-expanded={open}
            type={open ? "primary" : "default"}
            variant={open ? "outlined" : undefined}
            className={cn("justify-between w-full truncate", className)}
            style={style}
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
        )}
      </PopoverTrigger>
      <PopoverContent
        className={cn("p-0", {
          "w-fit": !popupMatchSelectWidth,
        })}
        style={
          popupMatchSelectWidth
            ? {
                width: width,
              }
            : undefined
        }
      >
        <Command
          className={cn("outline-none")}
          filter={(value, search, keywords) => {
            const extendValue = value + " " + keywords?.join(" ");
            if (extendValue.includes(search)) return 1;
            return 0;
          }}
        >
          <CommandInput
            componentSize={mergedSize}
            className={""}
            placeholder={searchPlaceholder}
          />
          <CommandList
            className={cn("py-2", {
              "py-1": mergedSize === "small",
            })}
          >
            <CommandEmpty
              className={cn({
                "p-0": !!renderEmpty,
              })}
            >
              {renderEmpty ? renderEmpty : "暂无数据"}
            </CommandEmpty>
            {option?.map((opt, index) => {
              return match(opt)
                .with({ options: P.nonNullable }, (_opt) => {
                  return (
                    <CommandGroup
                      componentSize={mergedSize}
                      className={"py-0"}
                      key={index}
                      heading={_opt.label ?? _opt.title}
                    >
                      {_opt.options.map((__opt) => renderOptionItem(__opt))}
                    </CommandGroup>
                  );
                })
                .otherwise((_opt) => (
                  <CommandGroup key={_opt.value} className={"p-0"}>
                    {renderOptionItem(_opt)}
                  </CommandGroup>
                ));
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
