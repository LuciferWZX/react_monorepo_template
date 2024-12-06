import {
  Descendant,
  Editor,
  Element as SlateElement,
  Node as SlateNode,
  Range as SlateRange,
  Text as SlateText,
  Transforms,
} from "slate";
import { MentionElement } from "../type/custom-slate.ts";
import { HistoryEditor } from "slate-history";
import escapeHtml from "escape-html";
import { jsx } from "slate-hyperscript";
import { match } from "ts-pattern";

export class EditorManager {
  public static shared = new EditorManager();
  // public static checkMentionConfig: CheckMentionConfig | undefined = undefined;
  public static initialValue: Descendant[] = [
    { type: "paragraph", children: [{ text: "" }] },
  ];
  public static pastedType: "text" | "origin" | undefined = undefined;
  // public static setCheckMentionConfig(config: CheckMentionConfig | undefined) {
  //   this.checkMentionConfig = config;
  // }
  public static getText(nodes: Descendant[], pureText?: boolean) {
    return this.serialize(nodes, { join: pureText ? "" : undefined });
  }
  public static getHtml(nodes: Descendant[]) {
    return this.serialize(nodes, { type: "html" });
  }
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
  public static getHtmlText(htmlStr: string | undefined) {
    if (!htmlStr) {
      return "";
    }
    const nodes = this.deserialize(htmlStr);
    return this.getText(nodes);
  }
  public static getNodesByType(editor: Editor, type: "mention" | "paragraph") {
    const nodes = Editor.nodes(editor, {
      at: [],
      match: (n) => SlateElement.isElement(n) && n.type === type,
    });
    const mentions: MentionElement[] = [];
    for (const [mention] of nodes) {
      mentions.push(mention as MentionElement);
    }
    return mentions;
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
  public static getPreNodeEntry = (editor: Editor) => {
    if (editor && editor.selection) {
      return Editor.previous(editor, {
        at: editor.selection,
      });
    }
    return null;
  };
  public static insertMention(
    editor: Editor,
    props: Omit<MentionElement, "type" | "children">,
    replaceLength?: number,
  ) {
    const mention: MentionElement = {
      type: "mention",
      label: props.label,
      trigger: props.trigger,
      value: props.value,
      children: [{ text: `${props.trigger}${props.label}` }],
    };
    HistoryEditor.withMerging(editor, () => {
      const { selection } = editor;
      if (selection && SlateRange.isRange(selection) && replaceLength) {
        const { anchor, focus } = selection;
        const focusOffset = focus.offset;
        const startOffset = focusOffset - replaceLength;
        const newRange = {
          anchor: {
            ...anchor,
            offset: startOffset < 0 ? 0 : startOffset,
          },
          focus: {
            ...focus,
          },
        };
        Transforms.select(editor, newRange);
      }
      //fixed:这边需要加个空的text不然插入的话光标丢失
      Transforms.insertNodes(editor, [mention, { text: "" }]);
      Transforms.move(editor);
    });

    editor.onChange();
  }

  /**
   * @description 序列化node节点 转为字符串文本或者是html字符串文本
   * @param nodes
   * @param config
   */
  public static serialize(
    nodes: Descendant[],
    config?: {
      type?: "html";
      join?: string;
    },
  ) {
    return nodes
      .map((n) => {
        if (config?.type === "html") {
          return this._serializeToHtml(n);
        }
        return SlateNode.string(n);
      })
      .join(config?.join !== undefined ? config.join : "\n");
  }
  private static _serializeToHtml(node: Descendant): string {
    if (SlateText.isText(node)) {
      let string = escapeHtml(node.text);
      if (node.bold) {
        string = `<strong>${string}</strong>`;
      }
      return string;
    }
    const children = node.children
      .map((n) => this._serializeToHtml(n))
      .join("");
    return match(node)
      .with({ type: "mention" }, (n) => {
        return `<mention data-value='${n.value}' data-trigger='${n.trigger}'>${children}</mention>`;
      })
      .with({ type: "paragraph" }, () => {
        return `<div>${children}</div>`;
      })
      .otherwise(() => {
        return children;
      });
  }

  /**
   * 将文本序列化成node节点
   * @param htmlStr
   */
  public static deserialize(htmlStr: string | undefined) {
    if (!htmlStr || !(htmlStr.startsWith("<div") && htmlStr.endsWith("div>"))) {
      htmlStr = `<div>${htmlStr}</div>`;
    }
    const document = new DOMParser().parseFromString(htmlStr, "text/html");
    const nodes = this._deserialize(document.body);
    if (Array.isArray(nodes)) {
      return nodes.filter((n) => !SlateText.isText(n));
    }
    return [nodes];
  }

  /**
   * 清空数据
   * @param editor
   * @param config
   */
  public static clear(editor: Editor, config?: { withHistory?: boolean }) {
    editor.children.map(() => {
      Transforms.delete(editor, { at: [0] });
    });
    Transforms.insertNodes(editor, this.initialValue);
    if (config?.withHistory !== false) {
      editor.history.redos = [];
      editor.history.undos = [];
    }
  }

  /**
   * 设置数据
   * @param editor
   * @param config
   */
  public static updateValue(
    editor: Editor,
    config?: { newValue?: Descendant[]; withHistory?: boolean },
  ) {
    editor.removeNodes();
    editor.children = config?.newValue ?? this.initialValue;
    editor.normalize({ force: true });
    if (config?.withHistory !== false) {
      editor.history.redos = [];
      editor.history.undos = [];
    }
  }
  private static _deserialize(
    el: HTMLElement | ChildNode,
    markAttributes: Record<string, any> = {},
  ): Descendant[] | Descendant {
    if (el.nodeType === Node.TEXT_NODE && el.textContent !== "\n") {
      //如果是文本节点
      return jsx("text", markAttributes, el.textContent);
    }
    // else if (el.nodeType !== Node.ELEMENT_NODE) {
    //   //如果不是元素节点
    //   return null;
    // }
    //这边附赠属性
    const nodeAttributes = { ...markAttributes };
    match(el.nodeName).with("STRONG", () => (nodeAttributes.bold = true));
    const children = Array.from(el.childNodes)
      .map((node) => this._deserialize(node, nodeAttributes))
      .flat();
    if (children.length === 0) {
      children.push(jsx("text", nodeAttributes, ""));
    }
    return match(el)
      .with({ nodeName: "BODY" }, () => {
        return jsx("fragment", {}, children);
      })
      .with({ nodeName: "DIV" }, () => {
        return jsx("element", { type: "paragraph" }, children);
      })
      .with({ nodeName: "BR" }, () => {
        return jsx("element", { type: "paragraph" }, children);
      })
      .with({ nodeName: "MENTION" }, (_el) => {
        return jsx(
          "element",
          {
            type: "mention",
            trigger: (_el as Element).getAttribute("data-trigger"),
            value: (_el as Element).getAttribute("data-value"),
            label: children
              .map((c) => (SlateText.isText(c) ? c.text : ""))
              .join(""),
          } as MentionElement,
          children,
        );
      })
      .otherwise(() => children);
  }
}
