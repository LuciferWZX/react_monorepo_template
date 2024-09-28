import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CustomElementType } from "../types/element.ts";
import { Descendant, Editor } from "slate";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function consumePlugins(
  pluginConsumer: Editor,
  plugins: ((editor: Editor) => Editor)[],
): Editor {
  let out = pluginConsumer;
  plugins.forEach((plugin) => {
    out = process(out, plugin);
  });
  return out;
}
function process(editor: Editor, curPlugin: (editor: Editor) => Editor) {
  return curPlugin(editor);
}

export function getDefaultContent(): Descendant[] {
  return [
    {
      type: CustomElementType.paragraph,
      children: [{ text: "" }],
    },
  ];
}
