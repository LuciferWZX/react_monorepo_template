import { RenderLeafProps } from "slate-react";

const Text = (props: RenderLeafProps) => {
  const { attributes, children, leaf } = props;
  return (
    <span
      // The following is a workaround for a Chromium bug where,
      // if you have an inline at the end of a block,
      // clicking the end of a block puts the cursor inside the inline
      // instead of inside the final {text: ''} node
      // https://github.com/ianstormtaylor/slate/issues/4704#issuecomment-1006696364
      className={leaf.text === "" ? "pl-[0.1]" : undefined}
      {...attributes}
    >
      {children}
    </span>
  );
};
export default Text;
