import { JsonSchema, SchemaDataType } from "../types";

const opt = Object.prototype.toString;
export function isString(obj: any): obj is string {
  return opt.call(obj) === "[object String]";
}
export function isNumber(obj: any): obj is number {
  return opt.call(obj) === "[object Number]" && obj === obj; // eslint-disable-line
}
export function isArray(obj: any): obj is any[] {
  return opt.call(obj) === "[object Array]";
}

export function isUndefined(obj: any): obj is undefined {
  return obj === undefined;
}
export function isObject(obj: any): obj is { [key: string]: any } {
  return opt.call(obj) === "[object Object]";
}

/**
 * 判断是否是正确的schema格式
 * @param obj
 */
export function isSchema(obj: any): obj is JsonSchema {
  return (
    isObject(obj) && !isUndefined(obj["uniqId"]) && !isUndefined(obj["type"])
  );
}

/**
 * 判断该类型是否属于schema的类型
 * @param type
 */
export function isSchemaType(type: string): type is SchemaDataType {
  return Object.values(SchemaDataType).includes(type as SchemaDataType);
}
