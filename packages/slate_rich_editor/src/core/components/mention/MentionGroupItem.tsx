import { forwardRef, HTMLAttributes } from "react";
import { MentionGroupItemType, MentionItemType } from "../../editor";
import MentionItem from "./MentionItem.tsx";
import cn from "classnames";
interface MentionGroupItemProps extends HTMLAttributes<HTMLUListElement> {
  data: MentionGroupItemType;
  activeValue?: string;
  highlightWords?: string;
  onClickItem: (data: MentionItemType) => void;
}
const MentionGroupItem = forwardRef<HTMLUListElement, MentionGroupItemProps>(
  (props, ref) => {
    const { data, activeValue, highlightWords, onClickItem } = props;
    return (
      <ul
        className={cn(
          "slate_rich_editor_menu_group_item overflow-hidden",
          data.className,
        )}
        ref={ref}
      >
        <label className={data.labelClassName}>{data.label}</label>
        <div className={"flex flex-col gap-[4px]"}>
          {data.children.map((item) => {
            return (
              <MentionItem
                onClickItem={onClickItem}
                highlightWords={highlightWords}
                isActive={activeValue === item.value}
                disabled={data.disabled}
                key={item.value}
                data={item}
              />
            );
          })}
        </div>
      </ul>
    );
  },
);
export default MentionGroupItem;
