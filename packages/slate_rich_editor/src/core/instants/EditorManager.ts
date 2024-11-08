import { Descendant } from "slate";

export class EditorManager {
  public static shared = new EditorManager();
  public static initialValue: Descendant[] = [
    { type: "paragraph", children: [{ text: "" }] },
  ];
}
