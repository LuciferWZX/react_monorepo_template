import { Editor } from "slate";

const withMention = (editor: Editor) => {
  const { isVoid, markableVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === "mention" ? true : isVoid(element);
  };

  editor.markableVoid = (element) => {
    return element.type === "mention" || markableVoid(element);
  };

  return editor;
};
export default withMention;
