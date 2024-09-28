import { RenderElementProps } from "slate-react";
import { match } from "ts-pattern";
import { CustomElementType } from "../../../types/element.ts";
import ParagraphElement from "./elements/paragraph";

const RenderElement = (props: RenderElementProps) => {
  const { element, children, ...restProps } = props;
  return match(element)
    .with({ type: CustomElementType.paragraph }, (paragraphElement) => {
      return (
        <ParagraphElement
          element={paragraphElement}
          {...restProps}
          children={children}
        />
      );
    })
    .otherwise(() => (
      <ParagraphElement element={element} {...restProps} children={children} />
    ));
};
export default RenderElement;
