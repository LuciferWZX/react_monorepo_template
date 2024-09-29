import { Editable, ReactEditor, Slate } from "slate-react";
import { useMemo, useState } from "react";
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
  classes?: {
    count?: string;
  };
  showCount?: boolean;
}
const SlateProEditor = (props: SlateProEditorProps) => {
  const {
    placeholder,
    className,
    value,
    onChange,
    classes,
    disabled,
    maxLength,
    showCount,
  } = props;
  const [_initialValue] = useState<Descendant[]>(getDefaultContent());
  const initialValue = useMemo(() => {
    if (value === undefined) {
      return _initialValue;
    }
    return deserializeHtmlString(value);
  }, [value, _initialValue]);

  const [editor] = useSlateEditor();

  const count = useMemo(() => {
    if (maxLength === undefined) {
      return 0;
    }
    const text = SlateEditorManager.shared.getNodePureText(initialValue, {
      withBreakLine: true,
    });

    return text.length;
  }, [maxLength, initialValue]);
  return (
    <Slate
      onValueChange={(val) => {
        const isComposing = ReactEditor.isComposing(editor);
        if (!isComposing) {
          const htmlStr = serializeNodes(val);
          onChange?.(htmlStr);
          // setInitialValue(val);
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
      {showCount && (
        <div
          className={cn(
            "absolute right-0 text-muted-foreground",
            classes?.count,
          )}
        >
          {count} / {maxLength}
        </div>
      )}
    </Slate>
  );
};
export default SlateProEditor;
