import { SchemaValidators } from "../src";
import { SchemaDataType } from "../src/types";
import { StringSchemaType } from "../src/types/string.ts";
const stringSchema: StringSchemaType = {
  type: SchemaDataType.string,
  uniqId: "0001",
  value: undefined,
};
test("string type schema should validate correctly", () => {
  expect(
    SchemaValidators.validate({
      type: SchemaDataType.string,
      uniqId: "0001",
      value: "xaw",
    }),
  ).toBe(undefined);
});
test("string type schema require value", () => {
  expect(
    SchemaValidators.validate({
      ...stringSchema,
      required: true,
    }),
  ).toEqual({
    id: stringSchema.uniqId,
    property: "required",
    reason: "该项必须有值",
  });
});
