export enum SchemaType {
  object = "object",
  array = "array",
  string = "string",
  number = "number",
  boolean = "boolean",
  enum = "enum",
}
type BaseSchemaType<T = SchemaType> = {
  $id: string;
  title?: string | undefined;
  description?: string | undefined;
  type?: T;
};
type ObjectSchemaType<T = SchemaType.object> = BaseSchemaType<T> & {
  /**
   * @description 定义属性
   */
  properties: Record<string, any>;
  /**
   * @description 必填属性
   */
  required?: string[];
  /**
   * @description 最大属性数量
   */
  maxProperties?: number;
  /**
   * @description 最小属性数量
   */
  minProperties?: number;
};
type ArraySchemaType<T = SchemaType.array> = BaseSchemaType<T> & {
  /**
   * @description 每个元素的类型
   */
  items: {
    type: SchemaType;
  };
  /**
   * @description 数组最小的元素个数
   */
  minItems?: number;
  /**
   * @description 数组最大的元素个数
   */
  maxItems?: number;
  /**
   * @description 每个元素都不相同
   */
  uniqueItems?: boolean;
};
type StringSchemaType<T = SchemaType.string> = BaseSchemaType<T> & {
  /**
   * @description 每个元素都不相同
   */
  maxLength?: number;
  /**
   * @description 每个元素都不相同
   */
  minLength?: number;
  /**
   * @description 用正则表达式约束字符串
   */
  pattern: RegExp;
};
type NumberSchemaType<T = SchemaType.number> = BaseSchemaType<T> & {
  /**
   * @description 最小值
   */
  minimum?: number;
  /**
   * @description 最大值
   */
  maximum?: number;
};
type BooleanSchemaType<T = SchemaType.boolean> = BaseSchemaType<T> & {};
type EnumSchemaType<T = SchemaType.enum> = BaseSchemaType<T> & {
  enum: (string | number)[];
};
export type Schema =
  | ObjectSchemaType
  | ArraySchemaType
  | StringSchemaType
  | NumberSchemaType
  | BooleanSchemaType
  | EnumSchemaType;
