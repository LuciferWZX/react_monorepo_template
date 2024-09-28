import { RenderElementProps } from "slate-react";

const ParagraphElement = (props: RenderElementProps) => {
  const { attributes, children } = props;
  return (
    <p className={"leading-5"} {...attributes}>
      {children}
    </p>
  );
};
export default ParagraphElement;
