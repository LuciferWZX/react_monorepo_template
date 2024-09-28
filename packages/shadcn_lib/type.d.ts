import {
  CustomEditor,
  CustomElement,
  CustomText,
} from "./src/types/element.ts";
declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
