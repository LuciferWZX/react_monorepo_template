import { IntegerSchemaType } from "../number.ts";

export const integerValidator = (value: number, schema: IntegerSchemaType) => {
  if (schema.multipleOf) {
    const notMultipleOf = validateMultipleOf(value, schema.multipleOf);
    if (notMultipleOf) {
      return notMultipleOf;
    }
  }
  if (schema.exclusiveMaximum) {
  }
  if (schema.exclusiveMinimum) {
  }
};
const validateMultipleOf = (value: number, multipleOf: number) => {
  const isInteger = Number.isInteger(multipleOf / value);
  if (!isInteger) {
    return {
      success: false,
      reason: `${value} 必须是 ${multipleOf} 的整数倍`,
    };
  }
};
const validateRange = (
  type: "maximum" | "minimum" | "exclusiveMaximum" | "exclusiveMinimum",
  value: number,
  limit: number,
) => {
  switch (type) {
    case "maximum": {
      if (value > limit) {
        return {
          success: false,
          reason: `${value} 超过了 ${limit}`,
        };
      }
      break;
    }
    case "minimum": {
      if (value < limit) {
        return {
          success: false,
          reason: `${value} 小于 ${limit}`,
        };
      }
      break;
    }
    case "exclusiveMaximum": {
      if (value <= limit) {
        return {
          success: false,
          reason: `${value} 超过了 ${limit}`,
        };
      }
    }
  }
};
