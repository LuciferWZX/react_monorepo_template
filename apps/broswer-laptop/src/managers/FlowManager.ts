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
import { FormInstance } from "antd";
import { SlateEditorManager } from "@zhixin/shadcn_lib";

interface BaseNodeConfig {
  icon?: LucideIcon;
  position: {
    x: number;
    y: number;
  };
}
export class FlowManager {
  forms: Map<string, FormInstance> = new Map();
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
        if (
          required &&
          required.includes(name) &&
          ![SchemaType.string].includes(dataObject.type)
        ) {
          rules = rules.concat({
            required: true,
            message: `${label}是必填项`,
          });
        }
        match(dataObject)
          .with({ type: SchemaType.string }, (stringObject) => {
            rules = rules.concat(() => ({
              validator(_, value: string) {
                if (required?.includes(name)) {
                  const pureText = SlateEditorManager.shared.getPureText(value);
                  if (pureText) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(`${label}是必填项`));
                }
                return Promise.resolve();
              },
            }));
            formItems.push({
              label: label,
              id: stringObject.$id,
              name: name,
              type: SchemaType.string,
              rules: rules,
              defaultValue: stringObject.value,
              maxLength: stringObject.maxLength,
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
  updateObjectProperties(
    orgValues: Record<string, any>,
    objectData: ObjectSchemaType,
  ) {
    const values = { ...orgValues };
    delete values._name_;
    const { properties } = objectData;
    const newProperties = { ...properties };
    for (const key in newProperties) {
      const object = newProperties[key];
      const { title } = object;
      if (key in values && title) {
        object.value = values[key];
      }
      // match(object).with({ type: SchemaType.string }, (stringObject) => {
      //   const {title}=stringObject
      //   if (title){
      //     stringObject.value = values[title]
      //   }
      //
      // });
    }
    return newProperties;
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
        setTitleWhenEmpty: "LLM",
        required: ["prompt", "model"],
        properties: {
          prompt: {
            $id: nanoid(8),
            title: "提示词",
            type: SchemaType.string,
            value: "",
            maxLength: 20,
          },
          model: {
            $id: nanoid(8),
            title: "模型",
            type: SchemaType.array,
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
  addFormInstance = (nodeId: string, form: FormInstance) => {
    this.forms.set(nodeId, form);
  };
}
