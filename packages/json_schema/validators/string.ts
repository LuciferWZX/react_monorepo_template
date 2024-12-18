import { StringSchemaType } from "../string.ts";

export const stringValidator = (value: string, schema: StringSchemaType) => {
  if (schema.pattern) {
    const result = schema.pattern.test(value);
    if (!result) {
      return {
        success: false,
        reason: `${value} doesn't match pattern`,
      };
    }
  }
  if (schema.minLength) {
    if (value.length < schema.minLength) {
      return {
        success: false,
        reason: `${value} doesn't match minimum length`,
      };
    }
  }
  if (schema.maxLength) {
    if (value.length > schema.maxLength) {
      return {
        success: false,
        reason: `${value} doesn't match maximum length`,
      };
    }
  }
  return {
    success: true,
  };
};
