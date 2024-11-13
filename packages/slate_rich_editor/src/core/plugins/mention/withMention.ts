import { Editor } from "slate";

const withMention = (editor: Editor) => {
  const { isSelectable } = editor;
  editor.isSelectable = (element) =>
    element.type !== "mention" && isSelectable(element);
  return editor;
};
export default withMention;
