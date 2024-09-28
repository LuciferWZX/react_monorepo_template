import { Editable, Slate } from "slate-react";
import { useState } from "react";
import { Descendant } from "slate";
import RenderElement from "./RenderElement.tsx";
import { cn, getDefaultContent } from "../../../lib/utils.ts";
import { useSlateEditor } from "../../../hooks/use-slate-editor.ts";
import { ScrollArea } from "../../index.ts";
// import { cn, ScrollArea } from "@zhixin/shadcn_lib";
interface SlateProEditorProps {
  placeholder?: string;
  value?: string;
  className?: string;
}
const SlateProEditor = (props: SlateProEditorProps) => {
  const { placeholder, className } = props;
  const [initialValue] = useState<Descendant[]>(getDefaultContent());
  const [editor] = useSlateEditor();
  return (
    <Slate editor={editor} initialValue={initialValue}>
      <ScrollArea
        hideHorizontal={true}
        breakAll={true}
        className={cn("border rounded-md   bg-background", className)}
        classes={{ viewport: "rounded-none min-h-9 px-3 py-2 max-h-20" }}
      >
        <Editable
          className={"outline-none"}
          renderElement={RenderElement}
          placeholder={placeholder}
        />
      </ScrollArea>
    </Slate>
  );
};
export default SlateProEditor;
