import { Node, NodeProps } from "@xyflow/react";
import { NodeFormItem, ObjectSchemaType, Schema, SchemaType } from "@/types";
import { cn } from "@zhixin/shadcn_lib";
import { memo } from "react";
import { Form, Input } from "antd";
import { Rule } from "antd/lib/form";
import { ShadcnSelect } from "@/components";
import { match } from "ts-pattern";

const LLMNodes = (
  props: NodeProps<Node<ObjectSchemaType<SchemaType.object, Schema>>>,
) => {
  const { data, selected } = props;
  return (
    <div
      className={cn(
        "rounded border p-2 bg-background w-80 ",
        "bg-gradient-to-b from-primary/40 to-30%",
        {
          "border-primary": selected,
        },
      )}
      onContextMenu={(event) => event.preventDefault()}
    >
      <LLMNodeData data={data} />
    </div>
  );
};

interface LLMNodeDataProps {
  data: ObjectSchemaType<SchemaType.object, Schema>;
}
const LLMNodeData = memo((props: LLMNodeDataProps) => {
  const { data } = props;
  const Icon = data.icon;
  const [form] = Form.useForm();
  console.log("渲染");
  const getFormItems = (nodeData: Schema) => {
    const formItems: Array<NodeFormItem> = [];
    match(nodeData).with({ type: SchemaType.object }, (_data) => {
      const { properties, required } = _data;

      for (const key in properties) {
        const dataObject = properties[key];
        if (!dataObject) {
          return [];
        }
        const name = key;
        const label = dataObject.title ?? "";
        let rules: Rule[] = [];
        if (required && required.includes(name)) {
          rules = rules.concat({
            required: true,
            message: `${label}是必填项`,
          });
        }
        match(dataObject)
          .with({ type: SchemaType.string }, (stringObject) => {
            formItems.push({
              label: label,
              id: stringObject.$id,
              name: name,
              type: SchemaType.string,
              rules: rules,
            });
          })
          .with({ type: SchemaType.enum }, (enumObject) => {
            formItems.push({
              label: label,
              id: enumObject.$id,
              name: name,
              type: SchemaType.enum,
              rules: rules,
              enum: enumObject.enum,
            });
          });
      }
    });

    return formItems;
  };
  return (
    <div>
      <div className={"flex gap-1 items-center"}>
        {Icon && (
          <span
            className={
              "inline-flex w-5 h-5 rounded bg-primary items-center justify-center flex-shrink-0"
            }
          >
            <Icon className={"w-4 h-4"} />
          </span>
        )}
        <Input variant={"borderless"} placeholder={"节点名称"} />
      </div>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        form={form}
        requiredMark={false}
        colon={false}
        autoComplete={"off"}
      >
        {getFormItems(data as Schema).map((item) => {
          return (
            <Form.Item
              key={item.id}
              rules={item.rules}
              name={item.name}
              label={item.label}
            >
              {match(item)
                .with({ type: SchemaType.string }, (_item) => {
                  return (
                    <Input
                      className={"nodrag nopan nowheel"}
                      placeholder={`请输入 ${_item.label}`}
                    />
                  );
                })
                .with({ type: SchemaType.enum }, (_item) => {
                  return (
                    <ShadcnSelect
                      className={"w-full nodrag nopan nowheel"}
                      placeholder={`请选择 ${item.label}`}
                      option={_item.enum.map((_op) => {
                        return {
                          value: _op.toString(),
                          label: _op,
                        };
                      })}
                    />
                  );
                })
                .otherwise(() => null)}
            </Form.Item>
          );
        })}
      </Form>
    </div>
  );
});
export default LLMNodes;
