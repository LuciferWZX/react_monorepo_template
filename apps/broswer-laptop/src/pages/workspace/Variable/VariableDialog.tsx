import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  ScrollArea,
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
import { CircleX } from "lucide-react";

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
      <DialogContent className="sm:max-w-[625px] max-h-screen overflow-auto outline-none">
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
          onValuesChange={console.log}
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
                      <Form.Item
                        className={"mb-0"}
                        label={"选项"}
                        initialValue={"是"}
                      >
                        <Form.Item
                          label={"true"}
                          name={["option", "true"]}
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
                          name={["option", "false"]}
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
                .with(VariableDataType.array, () => {
                  return (
                    <Fragment>
                      <Form.Item
                        label={"子类型"}
                        preserve={false}
                        name={"subType"}
                        initialValue={VariableDataType.string}
                      >
                        <ShadcnSelect
                          className={"w-full "}
                          placeholder={`请选择数据类型`}
                          onChange={(_type) => {
                            match(_type).otherwise(() => {
                              form.resetFields(["defaultValue"]);
                            });
                          }}
                          option={DATA_TYPE.filter((dataType) =>
                            [
                              VariableDataType.string,
                              VariableDataType.boolean,
                              VariableDataType.number,
                            ].includes(dataType.value),
                          ).map((_op) => {
                            return {
                              value: _op.value.toString(),
                              label: _op.label,
                            };
                          })}
                        />
                      </Form.Item>
                      <Form.Item label={"默认值"}>
                        <Form.List name={"defaultValue"} initialValue={[""]}>
                          {(fields, { add, remove }) => {
                            const subType: VariableDataType =
                              form.getFieldValue("subType");
                            return (
                              <Fragment>
                                <div className={"text-sm mb-1"}>
                                  已创建{" "}
                                  <span className={"text-primary"}>
                                    {fields.length}
                                  </span>{" "}
                                  项
                                </div>
                                <ScrollArea
                                  type={"always"}
                                  className={"mb-2"}
                                  classes={{
                                    viewport: "h-64 pr-4 pl-1",
                                  }}
                                >
                                  {fields.map(({ key, ...field }, index) => {
                                    return (
                                      <div
                                        key={key}
                                        className={"relative group mt-2"}
                                      >
                                        {fields.length > 1 && (
                                          <CircleX
                                            onClick={(event) => {
                                              event.preventDefault();
                                              remove(index);
                                            }}
                                            className={
                                              "fill-muted text-muted-foreground hover:text-primary hidden w-4 h-4 absolute -top-2 -right-1 z-10 cursor-pointer group-hover:block"
                                            }
                                          />
                                        )}
                                        <Form.Item
                                          dependencies={["subType"]}
                                          label={index + 1}
                                          {...field}
                                        >
                                          {match(subType)
                                            .with(
                                              VariableDataType.string,
                                              () => {
                                                return (
                                                  <ShadcnInput
                                                    placeholder={"请输入"}
                                                  />
                                                );
                                              },
                                            )
                                            .with(
                                              VariableDataType.number,
                                              () => {
                                                return (
                                                  <ShadcnNumberInput
                                                    placeholder={"请输入"}
                                                  />
                                                );
                                              },
                                            )
                                            .with(
                                              VariableDataType.boolean,
                                              () => {
                                                return (
                                                  <ShadcnRadioGroup
                                                    direction={"horizontal"}
                                                    options={[
                                                      { value: "true" },
                                                      { value: "false" },
                                                    ]}
                                                  />
                                                );
                                              },
                                            )
                                            .otherwise(() => null)}
                                        </Form.Item>
                                      </div>
                                    );
                                  })}
                                </ScrollArea>
                                <Form.Item>
                                  <Button
                                    className={"w-full"}
                                    onClick={() =>
                                      add(
                                        subType === VariableDataType.string
                                          ? ""
                                          : subType === VariableDataType.number
                                            ? 0
                                            : "true",
                                      )
                                    }
                                  >
                                    添加
                                  </Button>
                                </Form.Item>
                              </Fragment>
                            );
                          }}
                        </Form.List>
                      </Form.Item>
                      {/*<Form.Item label={"默认值"} name={"defaultValue"}>*/}
                      {/*  <ShadcnRadioGroup*/}
                      {/*    options={[{ value: "true" }, { value: "false" }]}*/}
                      {/*  />*/}
                      {/*</Form.Item>*/}
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
