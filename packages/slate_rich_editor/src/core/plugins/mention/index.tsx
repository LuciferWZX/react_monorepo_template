import { RenderElementProps } from "slate-react";
import { MentionElement } from "../../type/custom-slate.ts";
import { IS_MAC } from "../../lib";
import { Fragment } from "react";

const MentionNode = (props: RenderElementProps) => {
  const { attributes, children } = props;
  const element = props.element as MentionElement;
  return (
    <span
      {...attributes}
      data-trigger={element.trigger}
      contentEditable={false}
    >
      <div contentEditable={false}>
        {IS_MAC ? (
          // Mac OS IME https://github.com/ianstormtaylor/slate/issues/3490
          <Fragment>
            {children}${element.trigger}
            {element.label}
          </Fragment>
        ) : (
          // Others like Android https://github.com/ianstormtaylor/slate/pull/5360
          <Fragment>
            ${element.trigger}
            {element.label}
            {children}
          </Fragment>
        )}
      </div>
    </span>
  );
};
export default MentionNode;
