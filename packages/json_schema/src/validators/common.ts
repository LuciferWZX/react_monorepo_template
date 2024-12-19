import { isArray, isString, isUndefined } from "../utils";
import { ErrorSchema, JsonSchema, SchemaDataType } from "../types";
import { match } from "ts-pattern";
import { StringSchemaType } from "../types/string.ts";
import { BaseNumberSchemaType } from "../types/number.ts";

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
 * @param schema
 */
export function getValidateKeys(schema: JsonSchema) {
  return match(schema)
    .with({ type: SchemaDataType.string }, (_schema) => {
      const keys: Array<keyof StringSchemaType> = [];
      if (!isUndefined(_schema.required)) {
        keys.push("required");
      }
      if (!isUndefined(_schema.pattern)) {
        keys.push("pattern");
      }
      if (!isUndefined(_schema.minLength)) {
        keys.push("minLength");
      }
      if (!isUndefined(_schema.maxLength)) {
        keys.push("maxLength");
      }
      return keys;
    })
    .with(
      { type: SchemaDataType.integer },
      { type: SchemaDataType.number },
      (_schema) => {
        const keys: Array<keyof BaseNumberSchemaType> = [];
        if (!isUndefined(_schema.required)) {
          keys.push("required");
        }
        if (!isUndefined(_schema.maximum)) {
          keys.push("maximum");
        }
        if (!isUndefined(_schema.minimum)) {
          keys.push("minimum");
        }
        if (!isUndefined(_schema.exclusiveMaximum)) {
          keys.push("exclusiveMaximum");
        }
        if (!isUndefined(_schema.minimum)) {
          keys.push("exclusiveMinimum");
        }
        return keys;
      },
    )
    .otherwise(() => []);
}
function isEmptyString(value: string) {
  return value === "";
}
function isEmptyArray(value: any[]) {
  return value.length === 0;
}
