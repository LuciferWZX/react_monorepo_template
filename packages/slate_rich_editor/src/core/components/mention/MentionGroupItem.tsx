import { forwardRef, HTMLAttributes } from "react";
import { MentionGroupItemType } from "../../editor";
import MentionItem from "./MentionItem.tsx";
interface MentionGroupItemProps extends HTMLAttributes<HTMLUListElement> {
  data: MentionGroupItemType;
  activeValue?: string;
}
const MentionGroupItem = forwardRef<HTMLUListElement, MentionGroupItemProps>(
  (props, ref) => {
    const { data, activeValue } = props;
    return (
      <ul
        className={"slate_rich_editor_menu_group_item overflow-hidden"}
        ref={ref}
      >
        <label className={"text-black/40 text-sm leading-[18px] px-[8px]"}>
          {data.label}
        </label>
        <div className={"flex flex-col gap-[4px]"}>
          {data.children.map((item) => {
            return (
              <MentionItem
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
