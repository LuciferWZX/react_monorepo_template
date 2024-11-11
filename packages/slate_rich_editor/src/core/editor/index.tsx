import { useSearchMentions, useSlateEditor } from "../hooks";
import { Editable, RenderElementProps, Slate } from "slate-react";
import { EditableProps } from "slate-react/dist/components/editable";
import { ComponentProps, ReactNode, useCallback, useMemo } from "react";
import { BaseSelection, Descendant, Editor, Range as SlateRange } from "slate";
import { EditorManager } from "../instants";
import Element from "./Element.tsx";
import { match, P } from "ts-pattern";
import MentionProvider, { useMention } from "../plugins/mention/provider.tsx";
import { debounce } from "es-toolkit";

export interface MentionItemType {
  value: string;
  label: string;
  disabled?: boolean;
}
export interface MentionConfigDataType {
  trigger: "@" | "#";
  allowSearchAll?: boolean; //允许@的时候查询所有的
  mentions:
    | MentionItemType[]
    | ((searchText: string) => Promise<MentionItemType[]>);
  disabled?: boolean;
}
interface MentionConfig {
  enable?: boolean;
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
  //索索

  const { mentions, setMentions } = useMention();
  const {
    setTarget,
    setSearch,
    setOptIndex,
    setMentionData,
    refs,
    floatElement,
    getReferenceProps,
    isOpen,
    setIsOpen,
  } = useSearchMentions(editor);
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
        onFocus={() => {
          const { selection } = editor;
          console.log(111222, selection);
        }}
        renderElement={renderElement}
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
  const handleMentions = debounce(() => {
    if (mention?.enable) {
      const data = mention.data;
      const { selection } = editor;
      const prevChar = EditorManager.getPrevCharacter(editor);
      const matchTarget = data?.find((_data) => _data.trigger === prevChar);
      if (matchTarget && matchTarget.allowSearchAll) {
        //这边属于@的时候查看所有的
        const options = matchTarget.mentions;
        match(options)
          .with(P.instanceOf(Function), async (_func) => {
            const opts = await _func("");
            setMentions(opts);
          })
          .otherwise((opts) => {
            setMentions(opts);
          });
        setTarget(EditorManager.getPrevCharacterSelection(editor));
        setOptIndex(0);
        setSearch("");
        setMentionData(matchTarget);
        return;
      }
      if (selection && SlateRange.isCollapsed(selection)) {
        const [start] = SlateRange.edges(selection);
        const wordBefore = Editor.before(editor, start, {
          unit: "word",
        });
        const before = wordBefore && Editor.before(editor, wordBefore);
        const beforeRange = before && Editor.range(editor, before, start);
        const beforeText = beforeRange && Editor.string(editor, beforeRange);
        // const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/);
        for (let i = 0; i < (data ?? []).length; i++) {
          const targetData = (data ?? [])[i];
          const beforeMatch =
            beforeText &&
            beforeText.match(new RegExp(`^${targetData.trigger}([^@#]+)$`));
          const after = Editor.after(editor, start);
          const afterRange = Editor.range(editor, start, after);
          const afterText = Editor.string(editor, afterRange);
          const afterMatch = afterText.match(/^(\s|$)/);
          if (beforeMatch && afterMatch) {
            setTarget(beforeRange);
            setSearch(beforeMatch[1]);
            setMentionData(targetData);
            setOptIndex(0);
            return;
          }
        }
      }
      setTarget(undefined);
      setSearch("");
      setMentionData(undefined);
      setMentions([]);
    }
  }, 400);
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
          [handleMentions, isOpen, onSelectionChange, setIsOpen],
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
