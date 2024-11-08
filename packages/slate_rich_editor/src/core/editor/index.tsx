import { useSlateEditor } from "../hooks";
import { Editable, RenderElementProps, Slate } from "slate-react";
import { EditableProps } from "slate-react/dist/components/editable";
import { ComponentProps, ReactNode, useCallback, useMemo } from "react";
import { BaseSelection, Descendant, Editor, Range as SlateRange } from "slate";
import { EditorManager } from "../instants";
import Element from "./Element.tsx";

export interface MentionItemType {
  value: string;
  label: string;
  disabled?: boolean;
}
interface MentionConfig {
  enable?: boolean;
  data?: Array<{
    trigger: "@" | "#";
    mentions: MentionItemType[];
    disabled?: boolean;
  }>;
}
interface BaseEditorProps
  extends Omit<EditableProps, "onChange">,
    Pick<ComponentProps<typeof Slate>, "onSelectionChange" | "onValueChange"> {
  onChange?: (value: Descendant[]) => void;
  editableWrapper?: (editable: ReactNode) => ReactNode;
  mention?: MentionConfig;
}
export const BaseEditor = (props: BaseEditorProps) => {
  const {
    onChange,
    editableWrapper,
    onSelectionChange,
    onValueChange,
    mention,
    ...editableProps
  } = props;

  const [editor] = useSlateEditor();
  const renderElement = useCallback(
    (props: RenderElementProps) => (
      <Element {...props}>{props.children}</Element>
    ),
    [],
  );
  const mergedEditable = useMemo(() => {
    const editable = (
      <Editable renderElement={renderElement} {...editableProps} />
    );
    if (editableWrapper) {
      return editableWrapper(editable);
    }
    return editable;
  }, [editableProps, editableWrapper]);
  return (
    <Slate
      onChange={useCallback(
        (value: Descendant[]) => {
          if (onChange) {
            return onChange(value);
          }
        },
        [onChange],
      )}
      onValueChange={useCallback(
        (value: Descendant[]) => {
          if (onValueChange) {
            return onValueChange(value);
          }
        },
        [onValueChange],
      )}
      onSelectionChange={useCallback(
        (selection: BaseSelection) => {
          if (mention?.enable) {
            const data = mention.data;
            if (selection && SlateRange.isCollapsed(selection)) {
              // 获取光标前一个字符的位置
              const beforeSelection = Editor.before(editor, selection);
              console.log(888, beforeSelection);
              if (beforeSelection) {
                // 获取光标前一个字符的文本
                const beforeText = Editor.string(editor, beforeSelection);
                console.log(123, beforeText);
              }
            }
          }
          if (onSelectionChange) {
            return onSelectionChange(selection);
          }
        },
        [onSelectionChange, mention],
      )}
      editor={editor}
      initialValue={EditorManager.initialValue}
    >
      {mergedEditable}
    </Slate>
  );
};
