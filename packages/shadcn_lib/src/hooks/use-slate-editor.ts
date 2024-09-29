import { useMemo } from "react";
import { withReact } from "slate-react";
import { withHistory } from "slate-history";
import { createEditor } from "slate";
import { consumePlugins } from "../lib/utils.ts";
import { withParagraph } from "../components/editor/core/elements/paragraph/withParagraph.ts";

export const useSlateEditor = () => {
  const slateEditor = useMemo(() => {
    const plugins = [withParagraph, withReact, withHistory].reverse();
    return consumePlugins(createEditor(), plugins);
  }, []);
  const editor = useMemo(() => slateEditor, [slateEditor]);
  return [editor];
};
