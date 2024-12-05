import {
  ReactEditor,
  RenderElementProps,
  useSelected,
  useSlate,
} from "slate-react";
import { InlineChromiumBugfix } from "../InlineChromiumBugfix";
import cn from "classnames";
import { Editor, Transforms } from "slate";
const MentionNode = (props: RenderElementProps) => {
  const { attributes, element, children } = props;
  const editor = useSlate();
  const selected = useSelected();
  return (
    <span
      {...attributes}
      contentEditable={false}
      className={cn("text-primary")}
      data-playwright-selected={selected}
      //点击聚焦到后面
      onClick={() => {
        const path = ReactEditor.findPath(editor, element);
        const nextEntry = Editor.next(editor, { at: path });
        if (nextEntry) {
          const [, path] = nextEntry;
          const point = Editor.start(editor, path);
          Transforms.deselect(editor);
          Transforms.select(editor, point);
        }
      }}
    >
      <InlineChromiumBugfix />
      {children}
      <InlineChromiumBugfix />
    </span>
  );
};
export default MentionNode;
