import { useSearchMentions, useSlateEditor } from "../hooks";
import { Editable, RenderElementProps, Slate } from "slate-react";
import { EditableProps } from "slate-react/dist/components/editable";
import {
  ComponentProps,
  CSSProperties,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { BaseSelection, Descendant } from "slate";
import { EditorManager } from "../instants";
import Element from "./Element.tsx";
import MentionProvider, { useMention } from "../plugins/mention/provider.tsx";
import Text from "../plugins/Text";

export interface MentionItemType {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
export interface MentionGroupItemType {
  key: string;
  label: string;
  disabled?: boolean;
  children: MentionItemType[];
  className?: string;
  style?: CSSProperties;
}
export type MentionSelectItemType = MentionItemType | MentionGroupItemType;
export interface MentionConfigDataType {
  trigger: "@" | "#";
  allowSearchAll?: boolean; //允许@的时候查询所有的
  mentions:
    | MentionSelectItemType[]
    | ((searchText: string) => Promise<MentionSelectItemType[]>);
  disabled?: boolean;
}
export interface MentionConfig {
  enable?: boolean;
  classes?: {
    menu?: string;
  };
  styles?: {
    menu?: CSSProperties;
  };
  data?: Array<MentionConfigDataType>;
}
interface BaseEditorProps
  extends Omit<EditableProps, "onChange">,
    Pick<ComponentProps<typeof Slate>, "onSelectionChange" | "onValueChange"> {
  onChange?: (value: Descendant[]) => void;
  editableWrapper?: (editable: ReactNode) => ReactNode;
  mention?: MentionConfig;
}
export const SlateRichEditor = (props: BaseEditorProps) => {
  const { mention } = props;
  let baseEditor = <BaseEditor {...props} />;
  if (mention?.enable) {
    baseEditor = <MentionProvider>{baseEditor}</MentionProvider>;
  }
  return baseEditor;
};
const BaseEditor = (props: BaseEditorProps) => {
  const {
    onChange,
    editableWrapper,
    onSelectionChange,
    onValueChange,
    mention,
    ...editableProps
  } = props;

  const [editor] = useSlateEditor();

  const { mentions } = useMention();
  const {
    refs,
    floatElement,
    getReferenceProps,
    isOpen,
    setIsOpen,
    onKeyDown,
    handleMentions,
  } = useSearchMentions(editor, mention);

  console.log("mentions", mentions);
  const renderElement = useCallback(
    (props: RenderElementProps) => (
      <Element {...props}>{props.children}</Element>
    ),
    [],
  );

  const mergedEditable = useMemo(() => {
    let editable = (
      <Editable
        onKeyDown={onKeyDown}
        renderElement={renderElement}
        renderLeaf={(_props) => <Text {..._props}>{_props.children}</Text>}
        {...editableProps}
      />
    );
    //@todo 增加mention的provider
    if (mention?.enable) {
      editable = <MentionProvider>{editable}</MentionProvider>;
    }
    if (editableWrapper) {
      return editableWrapper(editable);
    }
    return editable;
  }, [editableProps, editableWrapper, mention?.enable]);
  return (
    <div ref={refs.setReference} {...getReferenceProps()}>
      <Slate
        onChange={useCallback(
          async (value: Descendant[]) => {
            if (onChange) {
              return onChange(value);
            }
          },
          [onChange],
        )}
        onValueChange={useCallback(
          (value: Descendant[]) => {
            handleMentions();
            if (onValueChange) {
              return onValueChange(value);
            }
          },
          [handleMentions, onValueChange],
        )}
        onSelectionChange={useCallback(
          (selection: BaseSelection) => {
            if (isOpen) {
              setIsOpen(false);
            }
            handleMentions();
            // handleMentions();
            if (onSelectionChange) {
              return onSelectionChange(selection);
            }
          },
          [isOpen, onSelectionChange],
        )}
        editor={editor}
        initialValue={EditorManager.initialValue}
      >
        {mergedEditable}
        {floatElement}
      </Slate>
    </div>
  );
};
