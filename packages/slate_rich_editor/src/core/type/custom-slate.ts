// This example is for an Editor with `ReactEditor` and `HistoryEditor`
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

export type ParagraphElement = {
  type: "paragraph";
  children: CustomText[];
};
export type MentionElement = {
  type: "mention";
  trigger: "@" | "#";
  value: string;
  label: string;
  children: CustomText[];
};
export type HeadingElement = {
  type: "heading";
  level: number;
  children: CustomText[];
};

export type CustomElement = ParagraphElement | HeadingElement | MentionElement;
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;
export type FormattedText = { text: string; bold?: true };

export type CustomText = FormattedText;

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
