import { Form } from "antd";
import NodeNameItemBox from "@/components/agent-flow/nodes/NodeNameItemBox.tsx";
import NodeDataItemBox from "@/components/agent-flow/nodes/NodeDataItemBox.tsx";
import { ObjectSchemaType, Schema } from "@/types";
import { FlowManager } from "@/managers";
import { useReactFlow } from "@xyflow/react";
import { useEffect } from "react";

interface NodeDataFormProps {
  data: Schema;
  nodeId: string;
}
const NodeDataForm = (props: NodeDataFormProps) => {
  const { data, nodeId } = props;
  const [form] = Form.useForm();
  const { updateNodeData } = useReactFlow();
  useEffect(() => {
    FlowManager.shared.addFormInstance(nodeId, form);
  }, []);
  return (
    <Form
      form={form}
      requiredMark={false}
      colon={false}
      autoComplete={"off"}
      layout={"vertical"}
      initialValues={{
        _name_: data.title,
        ...FlowManager.shared.getFormItemValues(data as Schema),
      }}
      onValuesChange={(value) => {
        let newName = data.title;
        if ("_name_" in value) {
          newName = value._name_;
        }
        const newProperties = FlowManager.shared.updateObjectProperties(
          value,
          data as ObjectSchemaType,
        );
        updateNodeData(nodeId, { title: newName, properties: newProperties });
      }}
    >
      <NodeNameItemBox
        onBlur={(val) => {
          if (!val) {
            form.setFieldValue(
              "_name_",
              (data as ObjectSchemaType).setTitleWhenEmpty,
            );
          }
        }}
        icon={data.icon}
      />
      <NodeDataItemBox data={data} />
    </Form>
  );
};
export default NodeDataForm;
