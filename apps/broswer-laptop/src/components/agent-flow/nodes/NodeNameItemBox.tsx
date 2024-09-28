import { Form } from "antd";
import { LucideIcon } from "lucide-react";
import ShadcnInput from "@/components/shadcn-input";
interface NodeNameItemBoxProps {
  icon?: LucideIcon;
  onBlur?: (val: string) => void;
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
        <ShadcnInput
          onBlur={(event) => props.onBlur?.(event.target.value)}
          className={"nodrag nopan nowheel p-1"}
          border={false}
          placeholder={"节点名称"}
        />
      </Form.Item>
    </div>
  );
};
export default NodeNameItemBox;
