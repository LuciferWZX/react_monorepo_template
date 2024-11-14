import { useMemo } from "react";
import { withReact } from "slate-react";
import { withHistory } from "slate-history";
import { consumePlugins } from "../lib";
import { createEditor } from "slate";
import withMention from "../plugins/mention/withMention.ts";
import withInlines from "../plugins/hoc/withInlines.ts";
import withParagraph from "../plugins/hoc/withParagraph.ts";

export const useSlateEditor = () => {
  const slateEditor = useMemo(() => {
    const plugins = [
      withParagraph,
      withInlines,
      withMention,
      withHistory,
      withReact,
    ].reverse();
    return consumePlugins(createEditor(), plugins);
  }, []);
  const editor = useMemo(() => slateEditor, [slateEditor]);
  return [editor];
};
