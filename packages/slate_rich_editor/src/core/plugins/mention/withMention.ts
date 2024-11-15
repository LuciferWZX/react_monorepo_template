import { Editor, Transforms, Text as SlateText } from "slate";
import { EditorManager } from "../../instants";

const withMention = (editor: Editor) => {
  const { isSelectable, deleteBackward, insertData } = editor;
  editor.isSelectable = (element) =>
    element.type !== "mention" && isSelectable(element);
  editor.deleteBackward = (unit) => {
    // const prevEntry = EditorManager.getPreNodeEntry(editor);
    deleteBackward(unit);
    if (editor.selection) {
      const entry = Editor.next(editor, { at: editor.selection });
      if (entry) {
        const [node, path] = entry;
        if (SlateText.isText(node) && !node.text) {
          const start = Editor.start(editor, path);
          Transforms.setSelection(editor, { anchor: start, focus: start });
        }
      }
    }
    // if (prevEntry) {
    // const [node, path] = prevEntry;
    // if (SlateText.isText(node) && !node.text) {
    //   const start = Editor.start(editor, path);
    //   Transforms.setSelection(editor, { anchor: start, focus: start });
    // }
    // }
  };
  editor.insertData = (data) => {
    if (EditorManager.pastedType === "text") {
      const text = data.getData("text/plain");
      editor.insertText(text);
      return;
    }
    insertData(data);
  };
  return editor;
};
export default withMention;
