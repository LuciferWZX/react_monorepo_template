import { isArray, isNumber, isString, isUndefined } from "../utils";
import { ErrorSchema, JsonSchema, SchemaDataType } from "../types";
import { match } from "ts-pattern";

export function validateValue(value: any, schema: JsonSchema) {
  if (isUndefined(value)) {
    return undefined;
  }
  const error: ErrorSchema = {
    id: schema.uniqId,
    property: "value",
    reason: `值类型错误`,
  };
  return match(schema)
    .with({ type: SchemaDataType.string }, () => {
      if (!isString(value)) {
        error.reason = "值必须是字符串";
        return error;
      }
    })
    .with(
      { type: SchemaDataType.integer },
      { type: SchemaDataType.number },
      (_schema) => {
        if (!isNumber(value)) {
          error.reason = "值必须是数字";
          return error;
        }
        if (
          _schema.type === SchemaDataType.integer &&
          !Number.isInteger(value)
        ) {
          error.reason = "值必须是整数数字";
          return error;
        }
      },
    )
    .otherwise(() => undefined);
}

/**
 * 验证是否必填
 * @param value
 * @param schema
 */
export function validateRequired(
  value: any,
  schema: JsonSchema,
): ErrorSchema | undefined {
  if (schema.required) {
    // 首先判断是否是undefined
    if (isUndefined(value)) {
      return {
        id: schema.uniqId,
        property: "required",
        reason: `该项必须有值`,
      };
    }
    //如果是字符串
    if (isString(value) && isEmptyString(value)) {
      return {
        id: schema.uniqId,
        property: "required",
        reason: `该字符串为空`,
      };
    }
    //如果是数组
    if (isArray(value) && isEmptyArray(value)) {
      return {
        id: schema.uniqId,
        property: "required",
        reason: `该数组为空`,
      };
    }
  }
}

/**
 * @description 获取各个类型所需验证的key
 * @param validateKeys
 * @param schema
 */
export function getValidateKeys<T = JsonSchema>(
  validateKeys: Array<keyof T>,
  schema: T,
): Array<keyof T> {
  const keys: Array<keyof T> = [];
  for (let i = 0; i < validateKeys.length; i++) {
    const key = validateKeys[i];
    if (!isUndefined(schema[key])) {
      keys.push(key);
    }
  }
  return keys;
}
function isEmptyString(value: string) {
  return value === "";
}
function isEmptyArray(value: any[]) {
  return value.length === 0;
}
