// const $schema7 = "http://json-schema.org/draft-07/schema#";
import { StringSchemaType } from "./string.ts";
import { IntegerSchemaType, NumberSchemaType } from "./number.ts";

export enum SchemaDataType {
  string = "string",
  number = "number",
  integer = "integer",
  object = "object",
  array = "array",
  boolean = "boolean",
  null = "null",
}

// uniqId: string;
// type: ;
// value:;

export type JsonSchema<T = never> =
  | StringSchemaType<T>
  | IntegerSchemaType<T>
  | NumberSchemaType<T>;
export interface ErrorSchema<T = JsonSchema> {
  id: string;
  property: keyof T;
  reason: string;
}
