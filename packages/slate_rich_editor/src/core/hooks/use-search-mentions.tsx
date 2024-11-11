import { useCallback, useEffect, useMemo, useState } from "react";
import { Editor, Range as SlateRange } from "slate";
import { MentionConfigDataType } from "../editor";
import { match, P } from "ts-pattern";
import { useMention } from "../plugins/mention/provider.tsx";
import {
  autoPlacement,
  autoUpdate,
  computePosition,
  ComputePositionReturn,
  inline,
  offset,
  ReferenceType,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react";
import { MentionMenu } from "../components";
import { ReactEditor } from "slate-react";
import { useLatest } from "ahooks";
export const useSearchMentions = (editor: Editor) => {
  const [target, setTarget] = useState<SlateRange | undefined>();

  const targetRef = useLatest(target);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
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
      open: 200,
      close: 100,
    },
    // initial: {
    //   opacity: 0,
    //   transform: "scale(0.8)",
    // },
    open: {
      opacity: 1,
    },
  });
  const { mentions, setMentions } = useMention();
  const [mentionData, setMentionData] = useState<
    MentionConfigDataType | undefined
  >(undefined);
  const [optIndex, setOptIndex] = useState(0);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (search && mentionData) {
      const { mentions } = mentionData;
      match(mentions)
        .with(P.instanceOf(Function), (getMentions) => {
          getMentions(search).then((data) => setMentions(data));
        })
        .otherwise((mentions) => {
          setMentions(
            mentions.filter((mention) => mention.label.includes(search)),
          );
        });
    }
  }, [search, mentionData, setMentions]);
  useEffect(() => {
    handleMenuOpenState();
  }, [mentions, target]);
  const handleMenuOpenState = useCallback(() => {
    if (target !== undefined && mentions.length !== 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [mentions.length, target]);
  const floatElement = useMemo(() => {
    return (
      isMounted && (
        <MentionMenu
          ref={refs.setFloating}
          style={{ ...floatingStyles, ...styles }}
          onClick={() => {
            ReactEditor.focus(editor);
          }}
          options={mentions}
          {...getFloatingProps()}
        />
      )
    );
  }, [floatingStyles, isMounted, mentions, refs.setFloating, target, styles]);
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
      computePosition(domRange, floating, {
        middleware: [
          inline({
            x: rect.x,
            y: rect.y,
          }),
          autoPlacement({
            allowedPlacements: [
              "top-start",
              "top-end",
              "bottom-start",
              "bottom-end",
            ],
          }),
          shift({ padding: 5 }),
          offset(6),
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
  return {
    target,
    setTarget,
    optIndex,
    setOptIndex,
    search,
    setSearch,
    mentionData,
    setMentionData,
    refs,
    floatElement,
    getReferenceProps,
    isOpen,
    setIsOpen,
  };
};
