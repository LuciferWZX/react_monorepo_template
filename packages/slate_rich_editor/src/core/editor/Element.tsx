import { RenderElementProps } from "slate-react";
import { match } from "ts-pattern";
import Mention from "../plugins/mention";

const Element = (
  // props: RenderElementProps & { config?: CheckMentionConfig },
  props: RenderElementProps,
) => {
  const { attributes, children, element } = props;
  return match(element)
    .with({ type: "mention" }, () => {
      return <Mention {...props}>{children}</Mention>;
    })
    .otherwise(() => {
      return <div {...attributes}>{children}</div>;
    });
};
export default Element;
