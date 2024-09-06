import { ComponentPropsWithoutRef } from "react";
import { Editor } from "@monaco-editor/react";

type ReactMonacoEditorProps = ComponentPropsWithoutRef<typeof Editor>;
const ReactMonacoEditor = (props: ReactMonacoEditorProps) => {
  const { ...restProps } = props;
  return <Editor {...restProps} />;
};
export default ReactMonacoEditor;
