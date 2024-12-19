import { JsonSchema, SchemaDataType } from "../types";
import { match } from "ts-pattern";
import { StringSchemaType } from "../types/string.ts";
import { stringValidator } from "./string.ts";
import { IntegerSchemaType, NumberSchemaType } from "../types/number.ts";
import { integerValidator, numberValidator } from "./number.ts";

export class SchemaValidators {
  public static validate(json: JsonSchema) {
    return match(json)
      .with({ type: SchemaDataType.string }, (_schema) => {
        return this.validateString(_schema);
      })
      .with({ type: SchemaDataType.integer }, (_schema) => {
        return this.validateInteger(_schema);
      })
      .with({ type: SchemaDataType.number }, (_schema) => {
        return this.validateNumber(_schema);
      })
      .otherwise(() => undefined);
  }

  /**
   * @description 字符串类型验证
   * @param schema
   * @private
   */
  private static validateString(schema: StringSchemaType) {
    return stringValidator(schema.value, schema);
  }

  /**
   * @description 整数类型验证
   * @param schema
   * @private
   */
  private static validateInteger(schema: IntegerSchemaType) {
    return integerValidator(schema.value, schema);
  }

  /**
   * @description 数字类型验证
   * @param schema
   * @private
   */
  private static validateNumber(schema: NumberSchemaType) {
    return numberValidator(schema.value, schema);
  }
}
