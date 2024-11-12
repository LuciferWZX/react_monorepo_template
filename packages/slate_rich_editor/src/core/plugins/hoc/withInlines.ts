import { Editor } from "slate";
//行内元素
const INLINE_ELEMENT = ["mention"];
//只读元素
const READONLY_ELEMENT = ["mention"];
const withInlines = (editor: Editor) => {
  const {
    // insertData,
    // insertText,

    isInline,
    isElementReadOnly,
    isSelectable,
  } = editor;
  editor.isInline = (element) => {
    return INLINE_ELEMENT.includes(element.type) || isInline(element);
  };
  editor.isElementReadOnly = (element) =>
    READONLY_ELEMENT.includes(element.type) || isElementReadOnly(element);

  editor.isSelectable = (element) => isSelectable(element);
  return editor;
};
export default withInlines;
