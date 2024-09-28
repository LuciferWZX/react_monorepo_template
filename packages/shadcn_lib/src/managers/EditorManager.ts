import { Descendant, Node as SlateNode } from "slate";
import { deserializeHtmlString } from "../lib/deserialize.ts";

export class SlateEditorManager {
  private constructor() {}

  public static shared = new SlateEditorManager();

  isEmpty(pureText: string): boolean {
    return pureText.trim() === "";
  }

  getPureText(htmlStr: string, config?: { withBreakLine?: boolean }): string {
    const nodes = deserializeHtmlString(htmlStr);
    return nodes
      .map((node) => SlateNode.string(node))
      .join(config?.withBreakLine ? "\n" : "");
  }
  getNodePureText(
    nodes: Descendant[],
    config?: { withBreakLine?: boolean },
  ): string {
    return nodes
      .map((node) => SlateNode.string(node))
      .join(config?.withBreakLine ? "\n" : "");
  }
}
