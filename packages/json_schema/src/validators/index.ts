import { ErrorSchema, ObjectSchemaType, SchemaDataType } from "../types";
import { match } from "ts-pattern";
import { StringSchemaType } from "../types";
import { stringValidator } from "./string.ts";
import { IntegerSchemaType, NumberSchemaType } from "../types";
import { integerValidator, numberValidator } from "./number.ts";
import { isSchema, isSchemaType } from "../utils";
import { objectValidator } from "./object.ts";

export class SchemaValidators {
  public static validate(json: any) {
    if (!isSchema(json)) {
      throw new Error("schema格式不正确");
    }
    if (!isSchemaType(json.type)) {
      throw new Error("schema类型不正确");
    }
    return match(json)
      .with({ type: SchemaDataType.string }, (_schema) => {
        return this.validateString(_schema);
      })
      .with({ type: SchemaDataType.object }, (_schema) => {
        return this.objectValidator(_schema);
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
   * 验证整个schema列表是否正确
   * @param jsons
   */
  public static validateAll(jsons: any[]) {
    const results: Array<ErrorSchema<any> | string> = [];
    for (let i = 0; i < jsons.length; i++) {
      try {
        const result = this.validate(jsons[i]);
        if (result) {
          results.push(result);
        }
      } catch (e) {
        results.push((e as any).message);
      }
    }
    return results;
  }

  public static async asyncValidateAll(
    json: any[],
  ): Promise<ReturnType<typeof this.validateAll>> {
    return new Promise((resolve) => {
      const result = this.validateAll(json);
      resolve(result);
    });
  }

  /**
   * 异步验证数据
   * @param json
   */
  public static async asyncValidate(
    json: any,
  ): Promise<ReturnType<typeof this.validate>> {
    return new Promise((resolve, reject) => {
      try {
        const result = this.validate(json);
        resolve(result);
      } catch (e) {
        reject((e as any)?.message ?? "unknown error please tell me");
      }
    });
  }

  /**
   * @description 字符串类型验证
   * @param schema
   * @private
   */
  private static validateString(schema: StringSchemaType) {
    return stringValidator(schema.value, schema);
  }
  private static objectValidator(schema: ObjectSchemaType) {
    return objectValidator(schema.value, schema);
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
