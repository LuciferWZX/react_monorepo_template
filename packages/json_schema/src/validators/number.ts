import { match } from "ts-pattern";
import {
  BaseNumberSchemaType,
  IntegerSchemaType,
  NumberSchemaType,
} from "../types/number.ts";
import { ErrorSchema } from "../types";
import { isUndefined } from "../utils";
import { getValidateKeys, validateRequired } from "./common.ts";

export const integerValidator = (
  value: number | undefined,
  schema: IntegerSchemaType,
) => {
  let error: ErrorSchema<IntegerSchemaType> | undefined;
  const keys = getValidateKeys(schema) as Array<keyof IntegerSchemaType>;
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
  const keys = getValidateKeys(schema) as Array<keyof NumberSchemaType>;
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
    .with("required", () => {
      return validateRequired(value, schema);
    })
    .with("multipleOf", () => {
      return validateMultipleOf(value, schema);
    })
    .with("maximum", () => {
      return validateNumberRange(value, "maximum", schema);
    })
    .with("exclusiveMaximum", () => {
      return validateNumberRange(value, "exclusiveMaximum", schema);
    })
    .with("minimum", () => {
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
      reason: `${value} 必须是 ${schema.multipleOf} 的整数倍`,
    };
    if (isUndefined(value)) {
      return error;
    }
    const isInteger = Number.isInteger(schema.multipleOf / value);
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
          error.reason = `${value} 必须小于等于 ${schema.maximum}`;
          return error;
        }
      }

      return undefined;
    })
    .with("minimum", () => {
      if (!isUndefined(schema.minimum)) {
        if (value < schema.minimum) {
          error.reason = `${value} 必须大于等于 ${schema.maximum}`;
          return error;
        }
      }
      return undefined;
    })
    .with("exclusiveMaximum", () => {
      if (!isUndefined(schema.exclusiveMaximum)) {
        if (value >= schema.exclusiveMaximum) {
          error.reason = `${value} 必须小于 ${schema.exclusiveMaximum}`;
          return error;
        }
      }
      return undefined;
    })
    .with("exclusiveMinimum", () => {
      if (!isUndefined(schema.exclusiveMinimum)) {
        if (value <= schema.exclusiveMinimum) {
          error.reason = `${value} 必须大于 ${schema.exclusiveMaximum}`;
          return error;
        }
      }
      return undefined;
    })
    .otherwise(() => undefined);
};
