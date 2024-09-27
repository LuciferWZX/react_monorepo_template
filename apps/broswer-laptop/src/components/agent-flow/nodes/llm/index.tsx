import { Node, NodeProps } from "@xyflow/react";
import { ObjectSchemaType, Schema, SchemaType } from "@/types";

import NodeBox from "@/components/agent-flow/nodes/NodeBox.tsx";
import { memo } from "react";
import NodeDataForm from "@/components/agent-flow/nodes/NodeDataForm.tsx";

const LLMNodes = (
  props: NodeProps<Node<ObjectSchemaType<SchemaType.object, Schema>>>,
) => {
  const { data, selected, id } = props;
  console.log(123, props);
  return (
    <NodeBox selected={selected}>
      <LLMNodeData nodeId={id} data={data} />
    </NodeBox>
  );
};

interface LLMNodeDataProps {
  nodeId: string;
  data: ObjectSchemaType<SchemaType.object, Schema>;
}
const LLMNodeData = memo((props: LLMNodeDataProps) => {
  const { data, nodeId } = props;
  console.log("渲染");

  return (
    <div>
      <NodeDataForm nodeId={nodeId} data={data as Schema} />
    </div>
  );
});
export default LLMNodes;
