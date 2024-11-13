import { HTMLAttributes, useLayoutEffect, useRef } from "react";
import { MentionItemType } from "../../editor";
import cn from "classnames";
interface MentionItemProps extends HTMLAttributes<HTMLLIElement> {
  data: MentionItemType;
  onClickItem: (data: MentionItemType) => void;
  disabled?: boolean;
  isActive: boolean;
}
const MentionItem = (props: MentionItemProps) => {
  const { data, disabled, onClickItem, isActive, className, style } = props;
  const liRef = useRef<HTMLLIElement>(null);
  const mergedDisabled = disabled || data.disabled;
  useLayoutEffect(() => {
    if (isActive) {
      liRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isActive]);
  return (
    <li
      className={cn(
        "leading-[24px] px-[8px] py-[2px] rounded cursor-pointer flex items-center gap-[4px]",
        {
          "hover:bg-primary/10": !mergedDisabled,
          "bg-primary/10": isActive,
          "!cursor-not-allowed text-black/10": mergedDisabled,
        },
        className,
      )}
      ref={liRef}
      style={style}
      onClick={() => onClickItem(data)}
    >
      <span className={"flex-shrink-0"}>{data.icon}</span>
      <div className={"flex-1 truncate"}>{data.label}</div>
    </li>
  );
};
export default MentionItem;
