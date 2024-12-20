import { match } from "ts-pattern";
import {
  BaseNumberSchemaType,
  IntegerSchemaType,
  NumberSchemaType,
} from "../types/number.ts";
import { ErrorSchema } from "../types";
import { isUndefined } from "../utils";
import { getValidateKeys, validateRequired, validateValue } from "./common.ts";
import Decimal from "decimal.js";

export const integerValidator = (
  value: number | undefined,
  schema: IntegerSchemaType,
) => {
  let error: ErrorSchema<IntegerSchemaType> | undefined;
  const validateKeys: Array<keyof IntegerSchemaType> = [
    "value",
    "required",
    "maximum",
    "exclusiveMaximum",
    "minimum",
    "exclusiveMinimum",
    "multipleOf",
  ];
  const keys = getValidateKeys(validateKeys, schema);

  for (let i = 0; i < keys.length; i++) {
    error = validate(keys[i], value, schema);
    if (error) {
      return error;
    }
  }
  return undefined;
};
export const numberValidator = (
  value: number | undefined,
  schema: NumberSchemaType,
) => {
  let error: ErrorSchema<NumberSchemaType> | undefined;
  const validateKeys: Array<keyof NumberSchemaType> = [
    "value",
    "required",
    "multipleOf",
    "maximum",
    "exclusiveMaximum",
    "minimum",
    "exclusiveMinimum",
  ];
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
  key: keyof IntegerSchemaType | keyof NumberSchemaType,
  value: number | undefined,
  schema: IntegerSchemaType | NumberSchemaType,
) => {
  return match(key)
    .with("value", () => {
      return validateValue(value, schema);
    })
    .with("required", () => {
      return validateRequired(value, schema);
    })
    .with("multipleOf", () => {
      return validateMultipleOf(value, schema);
    })
    .with("maximum", () => {
      if (!isUndefined(schema.exclusiveMaximum)) {
        return undefined;
      }
      return validateNumberRange(value, "maximum", schema);
    })
    .with("exclusiveMaximum", () => {
      return validateNumberRange(value, "exclusiveMaximum", schema);
    })
    .with("minimum", () => {
      if (!isUndefined(schema.exclusiveMinimum)) {
        return undefined;
      }
      return validateNumberRange(value, "minimum", schema);
    })
    .with("exclusiveMinimum", () => {
      return validateNumberRange(value, "exclusiveMinimum", schema);
    })
    .otherwise(() => undefined);
};
const validateMultipleOf = (
  value: number | undefined,
  schema: IntegerSchemaType | NumberSchemaType,
): ErrorSchema<IntegerSchemaType | NumberSchemaType> | undefined => {
  if (schema.multipleOf) {
    let error: ErrorSchema<IntegerSchemaType | NumberSchemaType> = {
      id: schema.uniqId,
      property: "multipleOf",
      reason: `值必须是 ${schema.multipleOf} 的整数倍`,
    };
    if (isUndefined(value)) {
      return error;
    }
    const isInteger = new Decimal(value).div(schema.multipleOf).isInteger();
    if (!isInteger) {
      return error;
    }
  }
};
const validateNumberRange = (
  value: number | undefined,
  type: "maximum" | "minimum" | "exclusiveMaximum" | "exclusiveMinimum",
  schema: BaseNumberSchemaType | NumberSchemaType,
): ErrorSchema<BaseNumberSchemaType | NumberSchemaType> | undefined => {
  let error: ErrorSchema<BaseNumberSchemaType | NumberSchemaType> = {
    id: schema.uniqId,
    property: type,
    reason: "",
  };
  if (isUndefined(value)) {
    error.reason = `值为undefined`;
    return error;
  }
  return match(type)
    .with("maximum", () => {
      if (!isUndefined(schema.maximum)) {
        if (value > schema.maximum) {
          error.reason = `值必须小于等于 ${schema.maximum}`;
          return error;
        }
      }

      return undefined;
    })
    .with("minimum", () => {
      if (!isUndefined(schema.minimum)) {
        if (value < schema.minimum) {
          error.reason = `值必须大于等于 ${schema.minimum}`;
          return error;
        }
      }
      return undefined;
    })
    .with("exclusiveMaximum", () => {
      if (!isUndefined(schema.exclusiveMaximum)) {
        if (value >= schema.exclusiveMaximum) {
          error.reason = `值必须小于 ${schema.exclusiveMaximum}`;
          return error;
        }
      }
      return undefined;
    })
    .with("exclusiveMinimum", () => {
      if (!isUndefined(schema.exclusiveMinimum)) {
        if (value <= schema.exclusiveMinimum) {
          error.reason = `值必须大于 ${schema.exclusiveMinimum}`;
          return error;
        }
      }
      return undefined;
    })
    .otherwise(() => undefined);
};
