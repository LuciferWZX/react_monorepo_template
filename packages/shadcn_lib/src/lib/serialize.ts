import { Descendant, Text as SlateText } from "slate";
import { match } from "ts-pattern";
import { CustomElementType } from "../types/element.ts";

export const serializeNodes = (nodes: Descendant[]): string => {
  return nodes
    .map((node) => {
      return serialize(node);
    })
    .join("");
};
const serialize = (node: Descendant): string => {
  if (SlateText.isText(node)) {
    return node.text;
  }
  const children = node.children.map((n) => serialize(n)).join("");
  return match(node)
    .with({ type: CustomElementType.mention }, (mention) => {
      return `<mention id='${mention.mentionId}' >${children}</mention>`;
    })
    .otherwise(() => {
      //默认p标签
      return `<p>${children}</p>`;
    });
};
