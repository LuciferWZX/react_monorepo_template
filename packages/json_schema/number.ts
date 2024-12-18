import { SchemaDataType } from "./types.ts";

export interface IntegerSchemaType<T = never> {
  type: SchemaDataType.integer;
  value: number;
  multipleOf?: number | undefined;
  minimum?: number | undefined;
  maximum?: number | undefined;
  exclusiveMinimum?: number | undefined;
  exclusiveMaximum?: number | undefined;
  format?: ((value: number) => T) | undefined;
}
