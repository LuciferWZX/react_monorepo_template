import { useMemo } from "react";
import { withReact } from "slate-react";
import { withHistory } from "slate-history";
import { consumePlugins } from "../lib";
import { createEditor } from "slate";

export const useSlateEditor = () => {
  const slateEditor = useMemo(() => {
    const plugins = [withReact, withHistory].reverse();
    return consumePlugins(createEditor(), plugins);
  }, []);
  const editor = useMemo(() => slateEditor, [slateEditor]);
  return [editor];
};
