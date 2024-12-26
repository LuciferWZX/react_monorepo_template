import { getValidateKeys, validateValue } from "./common.ts";
import { ErrorSchema, JsonSchema, ObjectSchemaType } from "../types";
import { match } from "ts-pattern";
import { isArray, isString, isUndefined } from "../utils";
import { SchemaValidators } from "./index.ts";

export const objectValidator = (
  value: Record<string, any> | undefined,
  schema: ObjectSchemaType,
): ErrorSchema<ObjectSchemaType> | undefined => {
  let error: ErrorSchema<ObjectSchemaType> | undefined;
  const validateKeys: Array<keyof ObjectSchemaType> = [
    "value",
    "required",
    // "additionalProperties",
    "minProperties",
    "properties",
    "maxProperties",
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
export const getAllObjectErrors = (
  value: Record<string, any> | undefined,
  schema: ObjectSchemaType,
): ErrorSchema<ObjectSchemaType>[] => {
  let errors: ErrorSchema<ObjectSchemaType>[] = [];
  const validateKeys: Array<keyof ObjectSchemaType> = [
    "value",
    "required",
    // "additionalProperties",
    "minProperties",
    "properties",
    "maxProperties",
  ];
  // const a = Object.fromEntries(Object.entries(schema));
  // console.log(111, a);
  const keys = getValidateKeys(validateKeys, schema);
  for (let i = 0; i < keys.length; i++) {
    const error = validate(keys[i], value, schema);
    if (error) {
      errors.push(error);
    }
  }
  return errors;
};

const validate = (
  key: keyof ObjectSchemaType,
  value: Record<string, any> | undefined,
  schema: ObjectSchemaType,
) => {
  return (
    match(key)
      .with("value", () => {
        return validateValue(value, schema);
      })
      .with("required", () => {
        return validateRequired(value, schema);
      })
      .with("properties", () => {
        return validateProperties(value, schema);
      })
      .with("maxProperties", () => {
        return validatePropertiesLimit("maxProperties", value, schema);
      })
      .with("minProperties", () => {
        return validatePropertiesLimit("minProperties", value, schema);
      })
      // .with("pattern", () => {
      //   return validatePattern(value, schema);
      // })
      // .with("maxLength", () => {
      //   return validateLength(value, "maxLength", schema);
      // })
      // .with("minLength", () => {
      //   return validateLength(value, "minLength", schema);
      // })
      .otherwise(() => undefined)
  );
};
function validateRequired(
  value: Record<string, any> | undefined,
  schema: ObjectSchemaType,
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
    const requiredKeys = schema.required.filter((item) => item !== "");
    for (let i = 0; i < requiredKeys.length; i++) {
      const key = requiredKeys[i];
      const v = value[key];
      if (isUndefined(v)) {
        return {
          id: schema.uniqId,
          property: "value",
          reason: `${key}字符串 必须有值`,
        };
      }
      if (isString(v) && v === "") {
        return {
          id: schema.uniqId,
          property: "value",
          reason: `${key}必须有值`,
        };
      }
      if (isArray(v) && v.length === 0) {
        return {
          id: schema.uniqId,
          property: "value",
          reason: `${key}数组 必须有值`,
        };
      }
    }
  }
}

function validateProperties(
  value: Record<string, any> | undefined,
  schema: ObjectSchemaType,
): ErrorSchema | undefined {
  if (!isUndefined(schema.properties)) {
    const properties = schema.properties;

    for (let key in properties) {
      const v = value?.[key];
      const propertyValue = properties[key] as JsonSchema;
      propertyValue.value = v;
      try {
        const error = SchemaValidators.validate(propertyValue);
        if (error) {
          let reason = `${error.reason}`;
          return {
            id: schema.uniqId,
            property: "value",
            reason: `${key}属性中的${reason}`,
            objectErrors: error,
          };
        }
      } catch (e) {
        return {
          id: schema.uniqId,
          property: "value",
          reason: `${key}属性${(e as any)?.message}`,
        };
      }
      // try {
      //   const error = SchemaValidators.validate(propertyValue);
      //   if (error) {
      //     let reason = `${error.reason}`;
      //     return {
      //       id: schema.uniqId,
      //       property: "value",
      //       reason: `${key}属性中的${reason}`,
      //       objectErrors: {
      //         [`${key}`]: error.objectErrors ? error.objectErrors : reason,
      //       },
      //     };
      //   }
      // } catch (e) {
      //   return {
      //     id: schema.uniqId,
      //     property: "value",
      //     reason: `${key}属性${(e as any)?.message}`,
      //   };
      // }
    }
  }
}

function validatePropertiesLimit(
  type: "maxProperties" | "minProperties",
  value: Record<string, any> | undefined,
  schema: ObjectSchemaType,
) {
  let error: ErrorSchema<ObjectSchemaType> = {
    id: schema.uniqId,
    property: type,
    reason: "",
  };
  return match(type)
    .with("maxProperties", () => {
      if (!isUndefined(value)) {
        const keys = Object.keys(value);
        if (!isUndefined(schema.maxProperties)) {
          if (keys.length > schema.maxProperties) {
            error.reason = `值的属性个数不能超过 ${schema.maxProperties}`;
            return error;
          }
        }
        return undefined;
      }
    })
    .with("minProperties", () => {
      error.reason = `值的属性个数不能小于 ${schema.maxProperties}`;
      if (isUndefined(value)) {
        return error;
      }
      const keys = Object.keys(value);
      if (!isUndefined(schema.minProperties)) {
        if (keys.length < schema.minProperties) {
          error.reason = `值的属性个数不能小于 ${schema.minProperties}`;
          return error;
        }
      }
      return undefined;
    })
    .otherwise(() => undefined);
}
