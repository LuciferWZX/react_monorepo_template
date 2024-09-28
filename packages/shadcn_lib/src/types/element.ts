import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;
export type FormattedText = { text: string; bold?: true };

export type CustomText = FormattedText;
export enum CustomElementType {
  paragraph = "paragraph",
  mention = "mention",
}
export type Paragraph = {
  type: CustomElementType.paragraph;
  children: CustomText[];
};
export type Mention = {
  type: CustomElementType.mention;
  mentionId: string;
  children: CustomText[];
};
export type CustomElement = Paragraph | Mention;
