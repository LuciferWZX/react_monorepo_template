import { LucideIcon } from "lucide-react";

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
  icon?: LucideIcon;
  type: T;
};
export type ObjectSchemaType<
  T = SchemaType.object,
  D = StringSchemaType | NumberSchemaType | EnumSchemaType | ArraySchemaType,
> = BaseSchemaType<T> & {
  /**
   * @description 定义属性
   */
  properties: Record<string, D>;
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
  /**
   * @description 当title为空的时候需要重置成的值
   */
  setTitleWhenEmpty?: string;
};
type ArraySchemaType<
  T = SchemaType.array,
  D = { value: string; label: string } | string | number,
> = BaseSchemaType<T> & {
  /**
   * @description 每个元素的类型
   */
  items: D[];
  /**
   * @description 值
   */
  value?: string | string[];
  /**
   * @description 是否多选
   */
  isMultiple?: boolean;
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
  pattern?: RegExp;
  /**
   * @description 值
   */
  value?: string;
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
  /**
   * @description 值
   */
  value?: number;
};
type BooleanSchemaType<T = SchemaType.boolean> = BaseSchemaType<T> & {};
type EnumSchemaType<T = SchemaType.enum> = BaseSchemaType<T> & {
  enum: (string | number)[];
  /**
   * @description 值
   */
  value?: string | number;
};
export type Schema =
  | ObjectSchemaType
  | ArraySchemaType
  | StringSchemaType
  | NumberSchemaType
  | BooleanSchemaType
  | EnumSchemaType;
