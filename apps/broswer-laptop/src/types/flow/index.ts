import { LucideIcon } from "lucide-react";
import { Node } from "@xyflow/react";
import { Schema, SchemaType } from "@/types";
import { Rule } from "antd/lib/form";
export enum FlowComponentGroup {
  AI = "AI",
}
export interface FlowComponentItem {
  type: FlowNodeType;
  name: string;
  icon?: LucideIcon;
}
export interface FlowComponent {
  group: FlowComponentGroup;
  icon?: LucideIcon;
  components: FlowComponentItem[];
}
export enum FlowNodeType {
  llm = "llm",
}
export type FlowNode = Node<Schema>;
interface BaseFormItemProps<T extends SchemaType> {
  id: string;
  name: string;
  label: string;
  rules?: Rule[];
  type: T;
}
export type StringFormItem = BaseFormItemProps<SchemaType.string>;
export type EnumFormItem = BaseFormItemProps<SchemaType.enum> & {
  enum: Array<string | number>;
};
export type NodeFormItem = StringFormItem | EnumFormItem;
