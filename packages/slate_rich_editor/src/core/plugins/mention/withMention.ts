import { Editor, Transforms, Text as SlateText } from "slate";
import { EditorManager } from "../../instants";

const withMention = (editor: Editor) => {
  const { isSelectable, deleteBackward } = editor;
  editor.isSelectable = (element) =>
    element.type !== "mention" && isSelectable(element);
  editor.deleteBackward = (unit) => {
    const prevEntry = EditorManager.getPreNodeEntry(editor);
    deleteBackward(unit);
    if (prevEntry) {
      const [node, path] = prevEntry;
      if (SlateText.isText(node) && !node.text) {
        const start = Editor.start(editor, path);
        Transforms.setSelection(editor, { anchor: start, focus: start });
      }
    }
  };
  return editor;
};
export default withMention;
