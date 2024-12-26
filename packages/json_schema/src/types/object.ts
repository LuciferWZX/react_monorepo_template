import { JsonSchema, SchemaDataType } from "./index.ts";
export interface ObjectSchemaType<T = never> {
  uniqId: string;
  type: SchemaDataType.object;
  value: Record<string, any> | undefined;
  properties?:
    | {
        [key: string]: Omit<JsonSchema, "value">;
      }
    | undefined;
  required?: Array<string> | undefined;
  // /**
  //  * @description该additionalProperties关键字用于控制的额外的东西，那就是性能，其名称没有在 properties 关键字中列出的或与
  //  * patternProperties 关键字中的任何正则表达式匹配的属性。默认情况下，允许任何其他属性。
  //  */
  // additionalProperties?: false | ValidateCondition | undefined;
  /**
   * @description 属性数量
   */
  minProperties?: number | undefined;
  maxProperties?: number | undefined;
  // patternProperties: {};
  format?: ((value: Object | undefined) => T) | undefined;
}
