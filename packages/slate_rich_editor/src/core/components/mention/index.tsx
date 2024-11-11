import { MentionItemType } from "../../editor";
import cn from "classnames";
import { forwardRef, HTMLAttributes } from "react";
interface MentionMenuProps extends HTMLAttributes<HTMLDivElement> {
  options: MentionItemType[];
}
export const MentionMenu = forwardRef<HTMLDivElement, MentionMenuProps>(
  (props, ref) => {
    const { options, className, ...restProps } = props;
    return (
      <div
        ref={ref}
        className={cn(
          "bg-red-400 p-2 transition-none max-w-md overflow-auto",
          className,
        )}
        {...restProps}
      >
        {options.map((option) => {
          return (
            <div className={"bg-blue-600 truncate"} key={option.value}>
              {option.label}
            </div>
          );
        })}
      </div>
    );
  },
);
