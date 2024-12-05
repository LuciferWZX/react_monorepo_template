import { useCallback, useState } from "react";
import { useSlateEditor } from "../hooks";
import { Editable, RenderElementProps, Slate } from "slate-react";
import Element from "./Element.tsx";
import { EditorManager } from "../instants";
import Text from "../plugins/Text";
import { Descendant } from "slate";
export type PrevSlateEditorProps = {
  initialValue?: Descendant[];
};
const PrevSlateEditor = (props: PrevSlateEditorProps) => {
  const [editor] = useSlateEditor();
  const [value] = useState<Descendant[]>(props.initialValue ?? []);
  const renderElement = useCallback(
    (props: RenderElementProps) => (
      <Element {...props}>{props.children}</Element>
    ),
    [],
  );

  return (
    <Slate editor={editor} initialValue={value ?? EditorManager.initialValue}>
      <Editable
        onError={(event) => {
          console.log("event:", event);
        }}
        readOnly={true}
        className={"text-sm leading-[24px]"}
        renderElement={renderElement}
        renderLeaf={(_props) => <Text {..._props}>{_props.children}</Text>}
      />
    </Slate>
  );
};
export default PrevSlateEditor;
