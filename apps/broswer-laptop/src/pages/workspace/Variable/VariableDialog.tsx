import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@zhixin/shadcn_lib";
import { Form, Radio } from "antd";
import { BaseVariable, VariableDataType, VariableScope } from "@/types";
import {
  ShadcnNumberInput,
  ShadcnRadioGroup,
  ShadcnSelect,
} from "@/components";
import ShadcnInput from "@/components/shadcn-input";
import { match } from "ts-pattern";
import { Fragment } from "react";

interface VariableDialogProps {
  open: boolean;
  onOpenChange: (visible: boolean) => void;
}
type VariableFormType = Omit<BaseVariable, "id" | "defaultValue">;
const DATA_TYPE = [
  { value: VariableDataType.string, label: "字符串" },
  { value: VariableDataType.number, label: "数字" },
  { value: VariableDataType.boolean, label: "布尔" },
  { value: VariableDataType.array, label: "数组" },
  { value: VariableDataType.object, label: "对象" },
  { value: VariableDataType.enum, label: "枚举" },
];
const VariableDialog = (props: VariableDialogProps) => {
  const { open, onOpenChange } = props;
  const [form] = Form.useForm<VariableFormType>();
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>新建变量</DialogTitle>
          <DialogDescription>
            在工作流中，变量通常指代在工作流程中使用的可变值或者占位符。
          </DialogDescription>
        </DialogHeader>
        <Form<VariableFormType>
          form={form}
          colon={false}
          requiredMark={false}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={
            {
              scope: VariableScope.local,
            } as VariableFormType
          }
        >
          <Form.Item label={"变量类型"} name={"scope"}>
            <Radio.Group>
              <Radio value={VariableScope.local}> 局部变量 </Radio>
              <Radio value={VariableScope.global}> 全局变量 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label={"名称"}
            name={"name"}
            rules={[
              { required: true, message: "请输入名称" },
              { whitespace: true, message: "请输入名称" },
            ]}
          >
            <ShadcnInput placeholder={"请输入名称"} maxLength={20} />
          </Form.Item>
          <Form.Item
            label={"数据类型"}
            name={"type"}
            rules={[{ required: true, message: "请输入名称" }]}
          >
            <ShadcnSelect
              className={"w-full "}
              placeholder={`请选择数据类型`}
              onChange={(_type) => {
                match(_type).otherwise(() => {
                  form.resetFields(["defaultValue"]);
                });
              }}
              option={DATA_TYPE.map((_op) => {
                return {
                  value: _op.value.toString(),
                  label: _op.label,
                };
              })}
            />
          </Form.Item>
          <Form.Item noStyle={true} dependencies={["type"]}>
            {({ getFieldValue }) => {
              const type: VariableDataType = getFieldValue("type");
              return match(type)
                .with(
                  VariableDataType.string,
                  VariableDataType.number,
                  (_type) => {
                    return (
                      <Form.Item label={"默认值"} name={"defaultValue"}>
                        {match(_type)
                          .with(VariableDataType.string, () => {
                            return <ShadcnInput placeholder={"请输入默认值"} />;
                          })
                          .with(VariableDataType.number, () => {
                            return (
                              <ShadcnNumberInput
                                aria-label={"数字输入框"}
                                placeholder={"请输入默认值"}
                              />
                            );
                          })
                          .otherwise(() => null)}
                      </Form.Item>
                    );
                  },
                )
                .with(VariableDataType.boolean, () => {
                  return (
                    <Fragment>
                      <Form.Item label={"选项"} initialValue={"是"}>
                        <Form.Item
                          label={"true"}
                          name={"option.true"}
                          initialValue={"是"}
                          rules={[
                            { required: true, message: "请输入真对应的名称" },
                            { whitespace: true, message: "请输入真对应的名称" },
                          ]}
                        >
                          <ShadcnInput placeholder={"真"} />
                        </Form.Item>
                        <Form.Item
                          label={"false"}
                          name={"option.false"}
                          initialValue={"否"}
                          rules={[
                            { required: true, message: "请输入假对应的名称" },
                            { whitespace: true, message: "请输入假对应的名称" },
                          ]}
                        >
                          <ShadcnInput placeholder={"假"} />
                        </Form.Item>
                      </Form.Item>
                      <Form.Item label={"默认值"} name={"defaultValue"}>
                        <ShadcnRadioGroup
                          options={[{ value: "true" }, { value: "false" }]}
                        />
                      </Form.Item>
                    </Fragment>
                  );
                })
                .otherwise(() => null);
            }}
          </Form.Item>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default VariableDialog;
