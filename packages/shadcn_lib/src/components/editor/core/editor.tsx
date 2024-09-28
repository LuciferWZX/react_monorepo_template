import { Editable, ReactEditor, Slate } from "slate-react";
import { useCallback, useState } from "react";
import { Descendant } from "slate";
import RenderElement from "./RenderElement.tsx";
import { cn, getDefaultContent } from "../../../lib/utils.ts";
import { useSlateEditor } from "../../../hooks/use-slate-editor.ts";
import { ScrollArea } from "../../index.ts";
import { serializeNodes } from "../../../lib/serialize.ts";
import { deserializeHtmlString } from "../../../lib/deserialize.ts";
import { SlateEditorManager } from "../../../managers/EditorManager.ts";
interface SlateProEditorProps {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (newValue: string) => void;
  className?: string;
  maxLength?: number;
  showCount?: boolean;
}
const SlateProEditor = (props: SlateProEditorProps) => {
  const { placeholder, className, value, onChange, disabled, maxLength } =
    props;
  const [initialValue, setInitialValue] = useState<Descendant[]>(
    value ? deserializeHtmlString(value) : getDefaultContent(),
  );
  const [editor] = useSlateEditor();
  const renderCount = useCallback(() => {
    const text = SlateEditorManager.shared.getNodePureText(initialValue, {
      withBreakLine: true,
    });
    return text.length;
  }, [initialValue]);
  return (
    <Slate
      onValueChange={(val) => {
        const isComposing = ReactEditor.isComposing(editor);
        if (!isComposing) {
          let canInput = true;
          if (maxLength !== undefined && renderCount() >= maxLength) {
            canInput = false;
          }
          if (canInput) {
            const htmlStr = serializeNodes(val);
            onChange?.(htmlStr);
            setInitialValue(val);
          }
        }
      }}
      editor={editor}
      initialValue={initialValue}
    >
      <ScrollArea
        hideHorizontal={true}
        breakAll={true}
        className={cn(
          "border border-input rounded-md bg-background focus:outline-none focus-within:ring-1 focus-within:ring-ring",
          {
            "opacity-50": disabled,
          },
          className,
        )}
        classes={{ viewport: "rounded-none min-h-9 px-3 py-2 max-h-20" }}
      >
        <Editable
          readOnly={disabled}
          className={"outline-none"}
          renderElement={RenderElement}
          placeholder={placeholder}
        />
      </ScrollArea>
      <div className={"absolute right-0 text-muted-foreground"}>
        {renderCount()} / {maxLength}
      </div>
    </Slate>
  );
};
export default SlateProEditor;
