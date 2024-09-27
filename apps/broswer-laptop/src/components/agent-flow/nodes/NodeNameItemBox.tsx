import { Form, Input } from "antd";
import { LucideIcon } from "lucide-react";
interface NodeNameItemBoxProps {
  icon?: LucideIcon;
}
const NodeNameItemBox = (props: NodeNameItemBoxProps) => {
  const Icon = props.icon;
  return (
    <div className={"flex gap-1 items-center mb-4"}>
      {Icon && (
        <span
          className={
            "inline-flex w-5 h-5 rounded bg-primary items-center justify-center flex-shrink-0"
          }
        >
          <Icon className={"w-4 h-4"} />
        </span>
      )}
      <Form.Item name={"_name_"} noStyle={true}>
        <Input
          className={"nodrag nopan nowheel p-1"}
          variant={"borderless"}
          placeholder={"节点名称"}
        />
      </Form.Item>
    </div>
  );
};
export default NodeNameItemBox;
