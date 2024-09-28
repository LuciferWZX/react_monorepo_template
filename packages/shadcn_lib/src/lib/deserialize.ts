import { Descendant } from "slate";
import { jsx } from "slate-hyperscript";
import { match } from "ts-pattern";
import { CustomElementType } from "../types/element.ts";
export const isParagraphTag = (text: string) => {
  return /^<p\b[^>]*>(.*?)<\/p>$/i.test(text);
};
export function deserializeHtmlString(text?: string) {
  let htmlStr = text ?? "";
  htmlStr = isParagraphTag(htmlStr) ? htmlStr : `<p>${htmlStr}</p>`;
  const replacedHtml = htmlStr.replace(/<br\s*\/?>/g, "</p><p>");
  const document = new DOMParser().parseFromString(replacedHtml, "text/html");
  return deserialize(document.body);
}
export function deserialize(
  el: Node,
  markAttributes: Record<string, string> = {},
): Descendant[] {
  const nodes: Descendant[] = [];
  if (el.nodeType === Node.TEXT_NODE) {
    nodes.push(jsx("text", markAttributes, el.textContent));
    return nodes;
  }
  if (el.nodeType !== Node.ELEMENT_NODE) {
    return nodes;
  }
  const nodeAttributes = { ...markAttributes };
  const children = Array.from(el.childNodes)
    .map((node) => {
      return deserialize(node, nodeAttributes);
    })
    .flat();
  if (children.length === 0) {
    children.push(jsx("text", nodeAttributes, ""));
  }
  return match(el)
    .with({ nodeName: "BODY" }, (_el) => {
      return jsx("fragment", {}, children);
    })
    .with({ nodeName: "P" }, (_el) => {
      return jsx("element", { type: CustomElementType.paragraph }, children);
    })
    .with({ nodeName: "MENTION" }, (__el) => {
      const _el = __el as Element;
      return jsx(
        "element",
        {
          type: CustomElementType.mention,
          nodeId: _el.getAttribute("node-id"),
        },
        [jsx("text", markAttributes, children)],
      );
    })
    .otherwise(() => {
      return children;
    }) as Descendant[];
}
