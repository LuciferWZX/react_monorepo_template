import { useSearchMentions, useSlateEditor } from "../hooks";
import { Editable, RenderElementProps, Slate } from "slate-react";
import { EditableProps } from "slate-react/dist/components/editable";
import {
  ComponentProps,
  CSSProperties,
  forwardRef,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
} from "react";
import { BaseSelection, Descendant, Editor } from "slate";
import { EditorManager } from "../instants";
import Element from "./Element.tsx";
import MentionProvider from "../plugins/mention/provider.tsx";
import Text from "../plugins/Text";

export interface MentionItemType {
  value: string;
  label: string;
  key: string;
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
  activeClassName?: string;
  style?: CSSProperties;
  render?: ReactNode;
}
export interface MentionGroupItemType {
  key: string;
  label: string;
  disabled?: boolean;
  children: MentionItemType[];
  className?: string;
  labelClassName?: string;
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
export type KeepSearchingDataType = Omit<
  MentionConfigDataType,
  "trigger" | "mentions"
> & {
  mentions:
    | MentionSelectItemType[]
    | ((
        searchText: string,
      ) => Promise<{ keywords: string; options: MentionSelectItemType[] }>);
};
export interface MentionConfig {
  enable?: boolean;
  keepSearching?: boolean;
  highlight?: boolean;
  keepSearchingData?: KeepSearchingDataType;
  loadingNode?: ReactNode;
  loading?: boolean;
  classes?: {
    menu?: string;
    menuGroup?: string;
    menuItem?: string;
    menuSelectedItem?: string;
  };
  styles?: {
    menu?: CSSProperties;
  };
  // check?: CheckMentionConfig;
  data?: Array<MentionConfigDataType>;
}
// export interface CheckMentionConfig {
//   enable?: boolean;
//   fetch?: (value: string) => Promise<string | undefined>;
// }
interface BaseEditorProps
  extends Omit<EditableProps, "onChange" | "value">,
    Pick<ComponentProps<typeof Slate>, "onSelectionChange" | "onValueChange"> {
  onChange?: (value: Descendant[]) => void;
  value?: Descendant[];
  editableWrapper?: (editable: ReactNode) => ReactNode;
  mention?: MentionConfig;
  uiRender?: (core: ReactNode) => ReactNode;
  hotKey?: EditorHotKeyConfig;
  pastedType?: "text" | "origin";
}
export interface EditorHotKeyConfig {
  switchLine?: "Enter" | "mod+Enter";
  confirm?: "Enter";
  onConfirm?: (value: Descendant[]) => void;
}
export type SlateRichEditorRef = {
  // setReference: (node: ReferenceType | null) => void;
  // getReferenceProps: (
  //   userProps?: React.HTMLProps<Element>,
  // ) => Record<string, unknown>;
  editorValue: Descendant[];
  editor: Editor;
};
export const SlateRichEditor = forwardRef<SlateRichEditorRef, BaseEditorProps>(
  (props, ref) => {
    const { mention } = props;
    let baseEditor = <BaseEditor ref={ref} {...props} />;
    if (mention?.enable) {
      baseEditor = <MentionProvider>{baseEditor}</MentionProvider>;
    }
    return baseEditor;
  },
);

const BaseEditor = forwardRef<SlateRichEditorRef, BaseEditorProps>(
  (props, ref) => {
    const {
      onChange,
      editableWrapper,
      onSelectionChange,
      onValueChange,
      mention,
      value,
      hotKey,
      pastedType,
      uiRender,
      ...editableProps
    } = props;
    const [editor] = useSlateEditor();

    const mergedDisabled = useMemo(() => {
      return props.disabled;
    }, [props.disabled]);
    const {
      refs,
      floatElement,
      getReferenceProps,
      isOpen,
      setIsOpen,
      onKeyDown,
      handleMentions,
    } = useSearchMentions(editor, mention, hotKey);
    useLayoutEffect(() => {
      EditorManager.pastedType = pastedType;
    }, [pastedType]);
    useImperativeHandle(ref, () => {
      return {
        editor: editor,
        // setReference: refs.setReference,
        // getReferenceProps: getReferenceProps,
        editorValue: editor.children,
      };
    });
    const renderElement = useCallback(
      // (props: RenderElementProps & { config?: CheckMentionConfig }) => (
      (props: RenderElementProps) => (
        // <Element {...props} config={mention?.check}>
        <Element {...props}>{props.children}</Element>
      ),
      [],
    );

    const mergedEditable = useMemo(() => {
      let editable = (
        <Editable
          onDrop={(e) => {
            e.preventDefault();
          }}
          onError={(event) => {
            console.log("event:", event);
          }}
          readOnly={mergedDisabled}
          className={"text-sm leading-[24px]"}
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
    }, [
      editableProps,
      editableWrapper,
      mention?.enable,
      onKeyDown,
      renderElement,
    ]);
    const coreComponent = (
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
        initialValue={value ?? EditorManager.initialValue}
      >
        {mergedEditable}
        {floatElement}
      </Slate>
    );

    return (
      <div ref={refs.setReference} {...getReferenceProps()}>
        {uiRender ? uiRender(coreComponent) : coreComponent}
      </div>
    );
  },
);
