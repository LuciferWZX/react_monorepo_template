import { Schema, SchemaType } from "@/types";
import { useMemo } from "react";
import { FlowManager } from "@/managers";
import { Form, Input } from "antd";
import { match, P } from "ts-pattern";
import { ShadcnSelect } from "@/components";

interface NodeDataItemBoxProps {
  data: Schema;
}
const NodeDataItemBox = (props: NodeDataItemBoxProps) => {
  const { data } = props;
  const formItems = useMemo(
    () => FlowManager.shared.getFormItems(data as Schema),
    [data],
  );
  return formItems.map((item) => {
    return (
      <Form.Item
        key={item.id}
        rules={item.rules}
        name={item.name}
        label={item.label}
      >
        {match(item)
          .with({ type: SchemaType.string }, (_item) => {
            return (
              <Input
                className={"nodrag nopan nowheel "}
                placeholder={`请输入 ${_item.label}`}
              />
            );
          })
          .with({ type: SchemaType.enum }, (_item) => {
            return (
              <ShadcnSelect
                className={"w-full nodrag nopan nowheel"}
                placeholder={`请选择 ${item.label}`}
                option={_item.enum.map((_op) => {
                  return {
                    value: _op.toString(),
                    label: _op,
                  };
                })}
              />
            );
          })
          .with({ type: SchemaType.array }, (_item) => {
            return (
              <ShadcnSelect
                className={"w-full nodrag nopan nowheel"}
                placeholder={`请选择 ${item.label}`}
                option={_item.option.map((_op) => {
                  return match(_op)
                    .with(P.string, P.number, (__op) => {
                      return {
                        value: __op.toString(),
                        label: __op,
                      };
                    })
                    .otherwise((__op) => {
                      return __op;
                    });
                })}
              />
            );
          })
          .otherwise(() => null)}
      </Form.Item>
    );
  });
};
export default NodeDataItemBox;
