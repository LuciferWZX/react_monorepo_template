import {
  cn,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@zhixin/shadcn_lib";
import { forwardRef, ReactNode, useContext, useMemo } from "react";
import { match, P } from "ts-pattern";
import DisabledContext from "antd/es/config-provider/DisabledContext";

export interface ShadcnOption {
  value: string;
  icon?: ReactNode;
  label?: ReactNode;
}
export interface ShadcnGroupOption {
  group: ReactNode;
  children: ShadcnOption[];
}
interface ShadcnSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  option: Array<ShadcnOption | ShadcnGroupOption>;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}
export const ShadcnSelect = forwardRef<HTMLButtonElement, ShadcnSelectProps>(
  (props, ref) => {
    const { value, disabled, onChange, className, placeholder, option } = props;
    const disabledContent = useContext(DisabledContext);
    const mergedDisabled = useMemo(
      () => disabled || disabledContent,
      [disabledContent, disabled],
    );
    return (
      <Select value={value} onValueChange={onChange} disabled={mergedDisabled}>
        <SelectTrigger
          onKeyDown={(event) => {
            event.stopPropagation();
          }}
          ref={ref}
          className={cn("w-fit", className)}
        >
          <SelectValue
            placeholder={
              <span className={"text-muted-foreground/60"}>{placeholder}</span>
            }
          />
        </SelectTrigger>
        <SelectContent
          onKeyDown={(event) => {
            event.stopPropagation();
          }}
        >
          {option.length === 0 ? (
            <div
              className={
                "h-10 text-muted-foreground text-sm flex items-center justify-center"
              }
            >
              暂无数据
            </div>
          ) : (
            option.map((op, index) => {
              return match(op)
                .with({ children: P._, group: P._ }, (_op) => {
                  return (
                    <SelectGroup key={index}>
                      <SelectLabel>{_op.group}</SelectLabel>
                      {_op.children.map((__op) => {
                        return (
                          <SelectGroup key={__op.value}>
                            <SelectItem value={__op.value} icon={__op.icon}>
                              {__op.label}
                            </SelectItem>
                          </SelectGroup>
                        );
                      })}
                    </SelectGroup>
                  );
                })
                .otherwise((_op) => {
                  return (
                    <SelectGroup key={_op.value}>
                      <SelectItem value={_op.value} icon={_op.icon}>
                        {_op.label}
                      </SelectItem>
                    </SelectGroup>
                  );
                });
            })
          )}
        </SelectContent>
      </Select>
    );
  },
);
