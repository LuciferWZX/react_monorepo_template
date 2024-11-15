import { MentionItemType, MentionSelectItemType } from "../../editor";
import cn from "classnames";
import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { match, P } from "ts-pattern";
import MentionItem from "./MentionItem.tsx";
import MentionGroupItem from "./MentionGroupItem.tsx";
import "./index.css";
import { useMention } from "../../plugins/mention/provider.tsx";
import { ScrollArea } from "../scroll-area";
interface MentionMenuProps extends HTMLAttributes<HTMLDivElement> {
  options: MentionSelectItemType[];
  loading?: boolean;
  loadingNode?: ReactNode;
  onClickItem: (data: MentionItemType) => void;
  parentWidth: number | undefined;
  highlightWords: string | undefined;
}
export const MentionMenu = forwardRef<HTMLDivElement, MentionMenuProps>(
  (props, ref) => {
    const {
      options,
      className,
      loadingNode,
      loading,
      style,
      parentWidth,
      highlightWords,
      onClickItem,
      ...restProps
    } = props;
    const { activeValue } = useMention();
    return (
      <div
        ref={ref}
        className={cn(
          "slate_rich_editor_menu  round max-w-full overflow-auto bg-white",
          className,
        )}
        style={{
          ...style,
          width: parentWidth,
        }}
        {...restProps}
      >
        <ScrollArea
          className={"flex flex-col gap-[4px] py-[12px] px-[8px]"}
          classes={{
            viewport: "[&>div]:!flex [&>div]:!flex-col max-h-[300px]",
          }}
        >
          {match(loading)
            .with(true, () => {
              if (loadingNode) {
                return loadingNode;
              }
              return <div className={"text-center"}>加载中...</div>;
            })
            .otherwise(() => {
              return options.map((option) => {
                return match(option)
                  .with({ children: P.not(undefined) }, (opt) => {
                    return (
                      <MentionGroupItem
                        key={opt.key}
                        onClickItem={onClickItem}
                        data={opt}
                        activeValue={activeValue}
                        highlightWords={highlightWords}
                        className={opt.className}
                        style={opt.style}
                      />
                    );
                  })
                  .otherwise((opt) => {
                    return (
                      <MentionItem
                        isActive={activeValue === opt.value}
                        key={opt.value}
                        onClickItem={onClickItem}
                        highlightWords={highlightWords}
                        data={opt}
                        className={opt.className}
                        style={opt.style}
                      />
                    );
                  });
              });
            })}
        </ScrollArea>
      </div>
    );
  },
);
