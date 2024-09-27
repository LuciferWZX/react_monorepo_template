import {
  FlowNode,
  FlowNodeType,
  ObjectSchemaType,
  Schema,
  SchemaType,
} from "@/types";
import { match } from "ts-pattern";
import { nanoid } from "nanoid";
import { Node } from "@xyflow/react";
import { LucideIcon } from "lucide-react";

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
          },
          model: {
            $id: nanoid(8),
            title: "模型",
            type: SchemaType.enum,
            //目前使用的星火大模型
            enum: [
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
