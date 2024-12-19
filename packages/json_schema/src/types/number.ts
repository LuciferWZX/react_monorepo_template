import { SchemaDataType } from "./index.ts";

export interface BaseNumberSchemaType<T = never> {
  uniqId: string;
  required?: boolean | undefined;
  value?: number | undefined;
  multipleOf?: number | undefined;
  minimum?: number | undefined;
  maximum?: number | undefined;
  exclusiveMinimum?: number | undefined;
  exclusiveMaximum?: number | undefined;
  format?: ((value: number) => T) | undefined;
}
export interface IntegerSchemaType<T = never> extends BaseNumberSchemaType<T> {
  type: SchemaDataType.integer;
}

export interface NumberSchemaType<T = never> extends BaseNumberSchemaType<T> {
  type: SchemaDataType.number;
}
