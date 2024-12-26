// const $schema7 = "http://json-schema.org/draft-07/schema#";
import { StringSchemaType } from "./string.ts";
import { IntegerSchemaType, NumberSchemaType } from "./number.ts";
import { ObjectSchemaType } from "./object.ts";

export interface ValidateCondition {
  type?: SchemaDataType;
}
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
  | ObjectSchemaType<T>
  | StringSchemaType<T>
  | IntegerSchemaType<T>
  | NumberSchemaType<T>;
export type {
  ObjectSchemaType,
  StringSchemaType,
  IntegerSchemaType,
  NumberSchemaType,
};
export interface ErrorSchema<T = JsonSchema> {
  id: string;
  property: keyof T;
  reason: string;
  objectErrors?: ErrorSchema<any> | undefined;
}
export interface ALLError<T = JsonSchema> {
  id: string;
  errors: Array<{
    property: keyof T;
    reason: string;
  }>;
}
