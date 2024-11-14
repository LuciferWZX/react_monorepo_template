import {
  Editor,
  Element as SlateElement,
  Node as SlateNode,
  Transforms,
} from "slate";

const withParagraph = (editor: Editor) => {
  const { normalizeNode } = editor;
  editor.normalizeNode = (entry) => {
    const [node, path] = entry;
    //格式化paragraph的节点是的数据是合法的
    if (SlateElement.isElement(node) && node.type === "paragraph") {
      for (const [child, childPath] of SlateNode.children(editor, path)) {
        if (SlateElement.isElement(child) && !editor.isInline(child)) {
          //解包
          Transforms.unwrapNodes(editor, { at: childPath });
          return;
        }
      }
    }
    normalizeNode(entry);
  };

  return editor;
};
export default withParagraph;
