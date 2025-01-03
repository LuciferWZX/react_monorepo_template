import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Editor, Range as SlateRange, Transforms } from "slate";
import {
  EditorHotKeyConfig,
  KeepSearchingDataType,
  MentionConfig,
  MentionConfigDataType,
  MentionItemType,
  MentionSelectItemType,
} from "../editor";
import { match, P } from "ts-pattern";
import { useMention } from "../plugins/mention/provider.tsx";
import {
  autoPlacement,
  autoUpdate,
  computePosition,
  ComputePositionReturn,
  inline,
  ReferenceType,
  shift,
  size,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react";
import { MentionMenu } from "../components";
import { ReactEditor } from "slate-react";
import { useLatest } from "ahooks";
import isHotkey, { isKeyHotkey } from "is-hotkey";
import { EditorManager, MentionManager } from "../instants";
export const useSearchMentions = (
  editor: Editor,
  config: MentionConfig | undefined,
  hotKey: EditorHotKeyConfig | undefined,
) => {
  const [target, setTarget] = useState<SlateRange | undefined>();

  const targetRef = useLatest(target);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    strategy: "fixed",
    whileElementsMounted: (reference, floating) => {
      return autoUpdate(
        reference,
        floating,
        () => updatePosition(reference, floating),
        {
          animationFrame: true,
        },
      );
    },
  });
  const dismiss = useDismiss(context, {
    outsidePress: true,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);
  const { isMounted, styles } = useTransitionStyles(context, {
    duration: {
      open: 0,
      close: 0,
    },
    // initial: {
    //   opacity: 0,
    //   transform: "scale(0.8)",
    // },
    open: {
      opacity: 1,
    },
  });
  const { mentions, setMentions, activeValue, setActiveValue } = useMention();
  const [mentionData, setMentionData] = useState<
    MentionConfigDataType | KeepSearchingDataType | undefined
  >(undefined);

  const [search, setSearch] = useState("");
  const [highlightWords, setHighlightWords] = useState("");
  useEffect(() => {
    if (search && mentionData) {
      const { mentions } = mentionData;
      match(mentions)
        .with(P.instanceOf(Function), () => {
          // getMentions(search).then((data) => {
          //   match(data).with(P.instanceOf(Array), (_data) => {
          //     setMentions(_data);
          //   });
          // });
        })
        .otherwise((mentions) => {
          const filtered: MentionSelectItemType[] = [];
          for (let i = 0; i < mentions.length; i++) {
            const targetMention = mentions[i];
            match(targetMention)
              .with({ children: P.not(undefined) }, (_target) => {
                const filteredChildren = _target.children.filter((__target) =>
                  __target.label.includes(search),
                );
                if (filteredChildren.length > 0) {
                  filtered.push({
                    ...targetMention,
                    children: filteredChildren,
                  });
                }
              })
              .otherwise((_targetMention) => {
                if (_targetMention.label.includes(search)) {
                  filtered.push(_targetMention);
                }
              });
          }
          setMentions(filtered);
        });
    }
  }, [search, mentionData]);

  useEffect(() => {
    if (!config?.enable) {
      return;
    }
    if (!target) {
      setIsOpen(false);
      return;
    }
    if (config?.loading) {
      setIsOpen(true);
      return;
    }
    if (mentions.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [config?.loading, config?.enable, mentions, target]);
  const selectMention = (_mention?: MentionItemType | undefined) => {
    if (target && (_mention || activeValue) && mentionData) {
      // Transforms.select(editor, target);
      const targetMention =
        _mention ?? MentionManager.getMentionItem(activeValue);
      if (!targetMention) {
        return;
      }
      Transforms.select(editor, target);
      match(mentionData)
        .with({ trigger: P.not(undefined) }, (_mentionData) => {
          EditorManager.insertMention(editor, {
            trigger: _mentionData.trigger,
            label: targetMention.label,
            value: targetMention.value,
          });
        })
        .otherwise(() => {
          EditorManager.insertMention(
            editor,
            {
              trigger: undefined,
              label: targetMention.label,
              value: targetMention.value,
            },
            highlightWords.length,
          );
        });

      resetSearchState();
    }
  };
  const floatElement = useMemo(() => {
    if (!config?.loading && mentions.length === 0) {
      return null;
    }
    return (
      isMounted && (
        <MentionMenu
          highlightWords={config?.highlight ? highlightWords : undefined}
          loading={config?.loading}
          loadingNode={config?.loadingNode}
          onClickItem={(data) => selectMention(data)}
          ref={refs.setFloating}
          parentWidth={refs.reference.current?.getBoundingClientRect()?.width}
          style={{ ...floatingStyles, ...styles, ...config?.styles?.menu }}
          onClick={() => {
            ReactEditor.focus(editor);
          }}
          options={mentions}
          className={config?.classes?.menu}
          {...getFloatingProps()}
        />
      )
    );
  }, [
    highlightWords,
    config?.loadingNode,
    config?.highlight,
    config?.loading,
    config?.classes,
    isMounted,
    refs.setFloating,
    refs.reference,
    floatingStyles,
    styles,
    mentions,
    getFloatingProps,
    editor,
  ]);
  //更新mention弹窗
  const updatePosition = useCallback(
    (_reference: ReferenceType, floating: HTMLElement) => {
      if (!targetRef.current) {
        return;
      }
      const domRange = ReactEditor.toDOMRange(editor, targetRef.current);
      if (!domRange) {
        return;
      }
      const rect = domRange.getBoundingClientRect();
      // const clientObject: ClientRectObject = {
      //   ..._reference.getBoundingClientRect(),
      //   // x: 0,
      // };
      // const virtualEl: VirtualElement = {
      //   getBoundingClientRect() {
      //     return clientObject;
      //   },
      //   getClientRects: () => {
      //     return [clientObject];
      //   },
      // };

      computePosition(domRange, floating, {
        middleware: [
          inline({
            x: rect.x,
            y: rect.y,
          }),
          size({
            apply({ elements }) {
              Object.assign(elements.floating.style, {
                minWidth: `${_reference.getBoundingClientRect().width}px`,
              });
            },
          }),
          autoPlacement({
            allowedPlacements: [
              "top",
              "bottom",
              // "top-start",
              // "top-end",
              // "bottom-start",
              // "bottom-end",
            ],
          }),
          shift({ padding: _reference.getBoundingClientRect().left }),
          // offset(2),
        ],
      }).then((cpr: ComputePositionReturn) => {
        const { x, y } = cpr;
        Object.assign(floating.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    },
    [editor, targetRef],
  );
  const fixedLeftRight = (event: KeyboardEvent<HTMLDivElement>) => {
    const { selection } = editor;

    // Default left/right behavior is unit:'character'.
    // This fails to distinguish between two cursor positions, such as
    // <inline>foo<cursor/></inline> vs <inline>foo</inline><cursor/>.
    // Here we modify the behavior to unit:'offset'.
    // This lets the user step into and out of the inline without stepping over characters.
    // You may wish to customize this further to only use unit:'offset' in specific cases.
    if (selection && SlateRange.isCollapsed(selection)) {
      const { nativeEvent } = event;
      if (isKeyHotkey("left", nativeEvent)) {
        event.preventDefault();
        Transforms.move(editor, { unit: "offset", reverse: true });
        return;
      }
      if (isKeyHotkey("right", nativeEvent)) {
        event.preventDefault();
        Transforms.move(editor, { unit: "offset" });
        return;
      }
    }
  };

  const resetSearchState = () => {
    setSearch("");
    setTarget(undefined);
    setMentions([]);
    setMentionData(undefined);
  };
  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      fixedLeftRight(event);
      // if (isHotkey("Space", event)) {
      //   event.preventDefault();
      //   console.log(111);
      //   editor.insertText(" ");
      // }
      if (isOpen && config?.enable) {
        if (isHotkey("ArrowDown", event)) {
          event.preventDefault();
          if (activeValue) {
            const nextValue = MentionManager.arrow("down", activeValue);
            setActiveValue(
              nextValue
                ? nextValue.value
                : MentionManager.getFirstMention()?.value,
            );
          }
        }
        if (isHotkey("ArrowUp", event)) {
          event.preventDefault();
          if (activeValue) {
            const nextValue = MentionManager.arrow("up", activeValue);
            setActiveValue(
              nextValue
                ? nextValue.value
                : MentionManager.getFirstMention()?.value,
            );
          }
        }
        if (isHotkey("Enter", event)) {
          event.preventDefault();
          if (mentions.length > 0) {
            selectMention();
          }
        }
      } else {
        if (hotKey?.switchLine) {
          if (hotKey.switchLine !== "Enter") {
            if (isHotkey("Enter", event.nativeEvent)) {
              event.preventDefault();
              hotKey.onConfirm?.(editor.children);
            }
          }
          if (isHotkey(hotKey.switchLine, event.nativeEvent)) {
            event.preventDefault();
            Editor.insertBreak(editor);
          }
        }
      }
    },
    [
      highlightWords,
      activeValue,
      config?.enable,
      hotKey,
      isOpen,
      target,
      mentions.length,
    ],
  );
  const handleMentions = () => {
    if (config?.enable) {
      //keepSearching优先级更大
      if (
        config.keepSearching &&
        config.keepSearchingData &&
        !config.keepSearchingData.disabled
      ) {
        //@todo 找到当前光标到上个节点的文字
        //@todo 设置target和search和activeValue和mentionData
        const { selection } = editor;
        if (selection && SlateRange.isCollapsed(selection)) {
          //当前节点的路径
          const path = Editor.path(editor, selection);
          //点前光标所在节点
          const point = Editor.point(editor, selection);
          const range = {
            anchor: { path, offset: 0 },
            focus: { path, offset: point.offset },
          };
          const text = Editor.string(editor, range);
          setHighlightWords("");
          if (text) {
            const { mentions: _mentions } = config.keepSearchingData;
            match(_mentions)
              .with(P.instanceOf(Function), async (_getMentions) => {
                const result = await _getMentions(text);
                setMentions(result.options);
                setHighlightWords(result.keywords);
              })
              .otherwise((_mentions) => {
                setMentions(_mentions);
              });
            setTarget(range);
            setMentionData(config.keepSearchingData);
            setSearch(text);
            return;
          }
        }
        setTarget(undefined);
        setSearch("");
        setMentionData(undefined);
        setActiveValue(undefined);
        setMentions([]);
        return;
      }
      const data = config.data;
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
          // const after = Editor.after(editor, start);
          // const afterRange = Editor.range(editor, start, after);
          // const afterText = Editor.string(editor, afterRange);
          // const afterMatch = afterText.match(/^(\s|$)/);
          // console.log(234, afterText);
          if (beforeMatch) {
            setTarget(beforeRange);
            setSearch(beforeMatch[1]);
            setMentionData(targetData);
            return;
          }
        }
      }
      setTarget(undefined);
      setSearch("");
      setMentionData(undefined);
      setActiveValue(undefined);
      setMentions([]);
    }
  };

  return {
    target,
    setTarget,
    search,
    setSearch,
    mentionData,
    setMentionData,
    refs,
    floatElement,
    getReferenceProps,
    resetSearchState,
    isOpen,
    setIsOpen,
    onKeyDown,
    handleMentions,
  };
};
