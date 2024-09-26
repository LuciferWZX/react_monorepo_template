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
interface BaseNodeConfig {
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
        return this._LLM(config);
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
        type: SchemaType.object,
        title: "LLM",
        properties: {},
      },
    };
  }
}
