import { Descendant, Editor, Range as SlateRange, Transforms } from "slate";
import { MentionElement } from "../type/custom-slate.ts";

export class EditorManager {
  public static shared = new EditorManager();
  public static initialValue: Descendant[] = [
    { type: "paragraph", children: [{ text: "" }] },
  ];
  public static getPrevCharacter(editor: Editor) {
    const { selection } = editor;
    if (selection && SlateRange.isCollapsed(selection)) {
      const [start] = SlateRange.edges(selection);
      const before = Editor.before(editor, start, { unit: "character" });
      if (before) {
        const range = Editor.range(editor, before, start);
        const text = Editor.string(editor, range);
        return text.charAt(text.length - 1);
      }
    }
    return null;
  }
  public static getPrevCharacterSelection(editor: Editor) {
    const { selection } = editor;
    if (selection) {
      const [start] = SlateRange.edges(selection);
      const beforeStart = Editor.before(editor, start, { unit: "character" });
      if (beforeStart) {
        return Editor.range(editor, beforeStart, start);
      }
    }
  }

  public static insertMention(
    editor: Editor,
    props: Omit<MentionElement, "type" | "children">,
  ) {
    const mention: MentionElement = {
      type: "mention",
      label: props.label,
      trigger: props.trigger,
      value: props.value,
      children: [{ text: "" }],
    };
    console.log(123, mention);
    Transforms.insertNodes(editor, mention);
    Transforms.move(editor);
  }
}
