import { useMemo } from "react";
import { withReact } from "slate-react";
import { withHistory } from "slate-history";
import { createEditor } from "slate";
import { consumePlugins } from "../lib/utils.ts";

export const useSlateEditor = () => {
  const slateEditor = useMemo(() => {
    const plugins = [withReact, withHistory].reverse();
    return consumePlugins(createEditor(), plugins);
  }, []);
  const editor = useMemo(() => slateEditor, [slateEditor]);
  return [editor];
};
