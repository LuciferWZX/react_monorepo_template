import { Node, NodeProps } from "@xyflow/react";
import { ObjectSchemaType, Schema, SchemaType } from "@/types";

const LLMNodes = (
  props: NodeProps<Node<ObjectSchemaType<SchemaType.object, Schema>>>,
) => {
  const { data } = props;
  return (
    <div onContextMenu={(event) => event.preventDefault()}>
      {data.$id}:{data.title}
    </div>
  );
};
export default LLMNodes;
