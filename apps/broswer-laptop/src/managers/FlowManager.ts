import {
  FlowNode,
  FlowNodeType,
  NodeFormItem,
  ObjectSchemaType,
  Schema,
  SchemaType,
} from "@/types";
import { match } from "ts-pattern";
import { nanoid } from "nanoid";
import { Node } from "@xyflow/react";
import { LucideIcon } from "lucide-react";
import { Rule } from "antd/lib/form";

interface BaseNodeConfig {
  icon?: LucideIcon;
  position: {
    x: number;
    y: number;
  };
}
export class FlowManager {
  private constructor() {}
  public static shared = new FlowManager();

  create(nodeType: FlowNodeType, config: BaseNodeConfig): FlowNode | null {
    return match(nodeType)
      .with(FlowNodeType.llm, () => {
        return this._LLM(config) as FlowNode;
      })
      .otherwise(() => null);
  }

  /**
   * @description 将data转为数组的形式
   * @param nodeData
   */
  getFormItems(nodeData: Schema) {
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
              defaultValue: stringObject.value,
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
          })
          .with({ type: SchemaType.array }, (arrayObject) => {
            formItems.push({
              label: label,
              id: arrayObject.$id,
              name: name,
              type: SchemaType.array,
              rules: rules,
              option: arrayObject.items,
              defaultValue: arrayObject.value,
            });
          });
      }
    });
    return formItems;
  }

  /**
   * @description 将data转为form的value形式
   * @param nodeData
   */
  getFormItemValues(nodeData: Schema) {
    const formItems = this.getFormItems(nodeData);
    const valuesObj: Record<string, any> = {};
    formItems.forEach((item) => {
      valuesObj[item.name] = item.defaultValue;
    });
    return valuesObj;
  }
  _LLM(
    config: BaseNodeConfig,
  ): Node<ObjectSchemaType<SchemaType.object, Schema>> {
    return {
      position: config.position,
      type: FlowNodeType.llm,
      id: nanoid(8),

      data: {
        $id: nanoid(8),
        icon: config.icon,
        type: SchemaType.object,
        title: "LLM",
        required: ["prompt", "model"],
        properties: {
          prompt: {
            $id: nanoid(8),
            title: "提示词",
            type: SchemaType.string,
            value: "xx",
          },
          model: {
            $id: nanoid(8),
            title: "模型",
            type: SchemaType.array,
            value: "general",
            //目前使用的星火大模型
            items: [
              "general",
              "generalv3",
              "pro-128k",
              "generalv3.5",
              "max-32k",
              "4.0Ultra",
            ],
          },
        },
      },
    };
  }
}
