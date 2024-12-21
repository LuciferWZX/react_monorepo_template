import { StringSchemaType } from "../types/string.ts";
import { isUndefined } from "../utils";
import { getValidateKeys, validateRequired, validateValue } from "./common.ts";
import { ErrorSchema } from "../types";
import { match } from "ts-pattern";

export const stringValidator = (
  value: string | undefined,
  schema: StringSchemaType,
): ErrorSchema<StringSchemaType> | undefined => {
  let error: ErrorSchema<StringSchemaType> | undefined;
  const validateKeys: Array<keyof StringSchemaType> = [
    "value",
    "required",
    "pattern",
    "minLength",
    "maxLength",
  ];
  // const a = Object.fromEntries(Object.entries(schema));
  // console.log(111, a);
  const keys = getValidateKeys(validateKeys, schema);
  for (let i = 0; i < keys.length; i++) {
    error = validate(keys[i], value, schema);
    if (error) {
      return error;
    }
  }
  return undefined;
};

const validate = (
  key: keyof StringSchemaType,
  value: string | undefined,
  schema: StringSchemaType,
) => {
  return match(key)
    .with("value", () => {
      return validateValue(value, schema);
    })
    .with("required", () => {
      return validateRequired(value, schema);
    })
    .with("pattern", () => {
      return validatePattern(value, schema);
    })
    .with("maxLength", () => {
      return validateLength(value, "maxLength", schema);
    })
    .with("minLength", () => {
      return validateLength(value, "minLength", schema);
    })
    .otherwise(() => undefined);
};
function validatePattern(value: string | undefined, schema: StringSchemaType) {
  let error: ErrorSchema<StringSchemaType> = {
    id: schema.uniqId,
    property: "pattern",
    reason: `该值不匹配正则表达式`,
  };
  if (schema.pattern) {
    if (isUndefined(value)) {
      return error;
    }
    const result = new RegExp(schema.pattern).test(value);
    if (!result) {
      return error;
    }
  }
}
function validateLength(
  value: string | undefined = "",
  type: "maxLength" | "minLength",
  schema: StringSchemaType,
) {
  let error: ErrorSchema<StringSchemaType> = {
    id: schema.uniqId,
    property: type,
    reason: "",
  };
  // if (isUndefined(value)) {
  // error.reason = `值为undefined`;
  // return error;
  // }
  return match(type)
    .with("maxLength", () => {
      if (!isUndefined(schema.maxLength)) {
        if (schema.maxLength < 0 || !Number.isInteger(schema.maxLength)) {
          error.reason = `maxLength属性只能是正整数`;
          return error;
        }
        if (value.length > schema.maxLength) {
          error.reason = `长度超过了 ${schema.maxLength}`;
          return error;
        }
      }
      return undefined;
    })
    .with("minLength", () => {
      if (!isUndefined(schema.minLength)) {
        if (schema.minLength < 0 || !Number.isInteger(schema.minLength)) {
          error.reason = `minLength属性只能是正整数`;
          return error;
        }
        if (value.length < schema.minLength) {
          error.reason = `长度小于 ${schema.minLength}`;
          return error;
        }
      }
      return undefined;
    })
    .otherwise(() => undefined);
}
