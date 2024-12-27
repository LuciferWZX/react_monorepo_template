import { Control } from "react-hook-form";
import { forwardRef } from "react";
import { Input } from "@/components";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { Trash } from "lucide-react";

export interface TableHeaderConfig {
  title: string;
  id: string;
}
interface TableHeaderFormItemProps {
  value?: TableHeaderConfig;
  onChange?: (headers: TableHeaderConfig) => void;
  control?: Control<any>;
  index: number;
  update: (index: number, data: TableHeaderConfig) => void;
  remove: (index: number) => void;
  className?: string;
  onlyOne: boolean;
}
const TableHeaderFormItem = forwardRef<
  HTMLDivElement,
  TableHeaderFormItemProps
>((props, ref) => {
  const { onlyOne, remove, index, className, control } = props;

  return (
    <div className={cn("flex gap-2", className)} ref={ref}>
      <FormField
        control={control}
        name={`headers.${index}.title`}
        render={({ field }) => (
          <FormItem className={"flex-1"}>
            <FormControl className={"mt-2"}>
              <Input
                overlapping={true}
                label={`表头${index + 1}`}
                placeholder={"请输入"}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full text-destructive hover:text-destructive mt-2 ",
              )}
              type={"button"}
              disabled={onlyOne}
              onClick={() => {
                remove(index);
              }}
              aria-label="delete item"
            >
              <Trash size={16} strokeWidth={2} aria-hidden="true" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="px-2 py-1 text-xs">删除</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
});
export default TableHeaderFormItem;
