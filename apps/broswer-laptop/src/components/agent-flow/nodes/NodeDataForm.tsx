import { Form } from "antd";
import NodeNameItemBox from "@/components/agent-flow/nodes/NodeNameItemBox.tsx";
import NodeDataItemBox from "@/components/agent-flow/nodes/NodeDataItemBox.tsx";
import { Schema } from "@/types";
import { FlowManager } from "@/managers";
// import { useReactFlow } from "@xyflow/react";

interface NodeDataFormProps {
  data: Schema;
  nodeId: string;
}
const NodeDataForm = (props: NodeDataFormProps) => {
  const { data, nodeId } = props;
  const [form] = Form.useForm();
  // const { updateNodeData } = useReactFlow();
  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      form={form}
      requiredMark={false}
      colon={false}
      autoComplete={"off"}
      initialValues={{
        _name_: data.title,
        ...FlowManager.shared.getFormItemValues(data as Schema),
      }}
      onValuesChange={(value) => {
        console.log(111, nodeId, value);
        //@todo FlowManager.shared.updateObjectProperties return new data
        // updateNodeData(nodeId, { properties: { aass: "dd" } });
      }}
    >
      <NodeNameItemBox icon={data.icon} />
      <NodeDataItemBox data={data} />
    </Form>
  );
};
export default NodeDataForm;
