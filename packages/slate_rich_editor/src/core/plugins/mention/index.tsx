import {
  ReactEditor,
  RenderElementProps,
  useSelected,
  useSlate,
} from "slate-react";
import { InlineChromiumBugfix } from "../InlineChromiumBugfix";
import cn from "classnames";
import { CheckMentionConfig } from "../../editor";
import { Editor, Transforms, Node as SlateNode } from "slate";
import { MentionElement } from "../../type/custom-slate.ts";
import { useEffect, useState } from "react";
import { HistoryEditor } from "slate-history";
import { LoaderCircle } from "lucide-react";

const MentionNode = (
  props: RenderElementProps & { config?: CheckMentionConfig },
) => {
  const { attributes, children, config } = props;
  const element = props.element as MentionElement;
  const editor = useSlate();
  const selected = useSelected();
  const [loading, setLoading] = useState<boolean>(false);
  const [invalid, setInvalid] = useState<boolean>(false);
  useEffect(() => {
    //只需要执行一次
    if (config?.enable && config.fetch) {
      const value = element.value;
      setLoading(true);
      config
        .fetch(value)
        .then((result) => {
          if (result !== element.label) {
            if (result === undefined) {
              //说明不存在，替换成字符串
              setInvalid(true);
            } else {
              //替换children
              const child = SlateNode.child(element, 0);
              const path = ReactEditor.findPath(editor, child);
              const start = Editor.start(editor, path);
              const end = Editor.end(editor, path);
              const range = Editor.range(editor, start, end);
              HistoryEditor.withoutSaving(editor, () => {
                Transforms.select(editor, range);
                Transforms.delete(editor);
                Transforms.insertNodes(editor, { text: result });
              });
            }
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [config?.enable]);

  return (
    <span
      {...attributes}
      contentEditable={false}
      className={cn(
        "text-primary  bg-primary/10 px-[4px] py-[2px] leading-[24px] mx-[2px] rounded",
        {
          "!text-danger !bg-danger/10": invalid,
        },
      )}
      data-playwright-selected={selected}
      // onClick={() => {
      //   const path = ReactEditor.findPath(editor, element);
      //   Transforms.unwrapNodes(editor, {
      //     at: path,
      //     match: (n) =>
      //       !Editor.isEditor(n) &&
      //       SlateElement.isElement(n) &&
      //       n.type === "mention",
      //   });
      // }}
    >
      <InlineChromiumBugfix />
      {loading && (
        <LoaderCircle
          className={
            "h-[16px] w-[16px] inline-flex align-text-bottom mr-[2px] ml-[-4px] animate-spin"
          }
        />
      )}
      {children}
      <InlineChromiumBugfix />
    </span>
  );
  // return (
  //   <span
  //     {...attributes}
  //     data-trigger={element.trigger}
  //     contentEditable={false}
  //     data-playwright-selected={selected}
  //     className={cn("inline-block bg-red-500", { "bg-yellow-500": selected })}
  //   >
  //     <div contentEditable={false}>
  //       {IS_MAC ? (
  //         // Mac OS IME https://github.com/ianstormtaylor/slate/issues/3490
  //         <Fragment>
  //           {children}
  //           {element.trigger}
  //           {element.label}
  //         </Fragment>
  //       ) : (
  //         // Others like Android https://github.com/ianstormtaylor/slate/pull/5360
  //         <Fragment>
  //           {element.trigger}
  //           {element.label}
  //           {children}
  //         </Fragment>
  //       )}
  //     </div>
  //   </span>
  // );
};
export default MentionNode;
