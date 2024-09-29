export enum VariableScope {
  global = "global",
  local = "local",
}
export enum VariableDataType {
  string = "string",
  number = "number",
  boolean = "boolean",
  object = "object",
  array = "array",
  enum = "enum",
}
export type BaseVariable<D = VariableDataType, T = unknown> = {
  id: string;
  scope: VariableScope;
  name: string;
  type: D;
  defaultValue: T | undefined;
  value: T | undefined;
};
export type StringVariable = BaseVariable<VariableDataType.string, string> & {};
export type NumberVariable = BaseVariable<VariableDataType.number, number> & {};
export type BooleanVariable = BaseVariable<
  VariableDataType.boolean,
  boolean
> & {};
export type ObjectVariable<T = any> = BaseVariable<
  VariableDataType.object,
  Record<string, T>
> & {};
export type ArrayVariable<T = string | number | boolean> = BaseVariable<
  VariableDataType.array,
  Array<{ value: T; label: string }>
> & {};
export type EnumVariable<T = string | number | boolean> = BaseVariable<
  VariableDataType.enum,
  Array<T>
> & {};
export type Variable =
  | StringVariable
  | NumberVariable
  | BooleanVariable
  | ObjectVariable
  | ArrayVariable
  | EnumVariable;
