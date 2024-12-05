import {
  Fragment,
  HTMLAttributes,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { MentionItemType } from "../../editor";
import Highlighter from "react-highlight-words";
import cn from "classnames";
interface MentionItemProps extends HTMLAttributes<HTMLLIElement> {
  data: MentionItemType;
  onClickItem: (data: MentionItemType) => void;
  disabled?: boolean;
  isActive: boolean;
  highlightWords?: string;
}
const MentionItem = (props: MentionItemProps) => {
  const {
    data,
    disabled,
    highlightWords,
    onClickItem,
    isActive,
    className,
    style,
  } = props;
  const liRef = useRef<HTMLLIElement>(null);
  const mergedDisabled = disabled || data.disabled;
  useLayoutEffect(() => {
    if (isActive) {
      liRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isActive]);
  const needHighlight = useMemo(() => {
    return !mergedDisabled && !!highlightWords;
  }, [highlightWords, mergedDisabled]);
  return (
    <li
      className={cn(
        "leading-[24px] px-[8px] py-[2px] rounded cursor-pointer flex items-center gap-[4px]",
        {
          "hover:bg-primary/10": !mergedDisabled,
          [data.activeClassName ? data.activeClassName : "bg-primary/10"]:
            isActive,
          "!cursor-not-allowed text-black/10": mergedDisabled,
        },
        className,
      )}
      ref={liRef}
      style={style}
      onClick={() => onClickItem(data)}
    >
      {data.render ? (
        data.render
      ) : (
        <Fragment>
          <span className={"flex-shrink-0"}>{data.icon}</span>
          <div className={"flex-1 truncate"}>
            <Highlighter
              highlightClassName="text-primary bg-transparent"
              searchWords={[needHighlight ? (highlightWords ?? "") : ""]}
              autoEscape={true}
              textToHighlight={data.label}
            />
          </div>
        </Fragment>
      )}
    </li>
  );
};
export default MentionItem;
