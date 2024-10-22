import {
  Button,
  CheckBoxGroup,
  Checkbox,
  Combobox,
  ConfigProvider,
  Flex,
  NumberInput,
  TextInput,
  useTheme,
  Layout,
} from "@/components";
import { useState } from "react";
import { SizeType } from "@/components/config-provider/SizeContext.tsx";
import { Theme } from "@/components/theme-provider";
const options: any[] = [];

for (let i = 1; i <= 50; i++) {
  options.push({
    label: i === 20 ? `选项2222222222222222222222222222 ${i}` : `选项 ${i}`,
    disabled: i % 2 === 0,
    value: `option${i}`,
  });
}
const ConfigProviderPage = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [size, setSize] = useState<SizeType>(undefined);
  const { setTheme } = useTheme();
  return (
    <Layout>
      <div className={"p-2"}>
        <Flex className={"mb-2"} wrap={true}>
          <NumberInput
            step={0.1}
            onChange={(value) => {
              const root = document.documentElement;
              root.style.setProperty("--radius", `${value}rem`);
            }}
            aria-label={"radius"}
            placeholder={"圆角"}
          />
          <Checkbox
            checked={disabled}
            onCheckedChange={(checked) => setDisabled(!!checked)}
          >
            禁用
          </Checkbox>
          <Combobox
            placeholder={"大小"}
            value={size}
            onChange={(val) => {
              setSize(val as SizeType);
            }}
            className={"w-48"}
            option={[
              { value: "small", label: "小" },
              { value: "middle", label: "中" },
              { value: "large", label: "大" },
            ]}
          />
          <Combobox
            placeholder={"主题"}
            value={size}
            onChange={(val) => {
              setTheme(val as Theme);
            }}
            className={"w-48"}
            option={[
              { value: "light", label: "light" },
              { value: "dark", label: "dark" },
              { value: "system", label: "system" },
            ]}
          />
        </Flex>
        <ConfigProvider componentDisabled={disabled} componentSize={size}>
          <Flex gap={10}>
            <Button>默认</Button>
            <Button type={"primary"}>primary</Button>
            <Button loading={true} type={"primary"}>
              loading
            </Button>
            <Button type={"danger"}>danger</Button>
          </Flex>
          <Flex gap={10} wrap={true} className={"my-2"}>
            <div className={"flex gap-2"}>
              <TextInput aria-label={"input"} placeholder={"请输入"} />
              <NumberInput aria-label={"number"} placeholder={"请输入"} />
              <TextInput
                aria-label={"input"}
                disabled={true}
                placeholder={"disabled请输入"}
              />
            </div>
            <Button type={"primary"}>primary</Button>
            <Button>default</Button>
          </Flex>
          <Flex gap={10} className={"w-full"}>
            <Combobox
              showSearch={false}
              popupMatchSelectWidth={false}
              className={"w-40"}
              option={[
                {
                  title: "水果",
                  options: [
                    { label: "香蕉", value: "banana" },
                    { label: "香蕉", value: "banana2" },
                    { label: "香蕉", value: "banana3" },
                    {
                      label: "苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果",
                      value: "apple",
                    },
                  ],
                },
                {
                  title: "鞋子",
                  options: [
                    { label: "运动鞋", value: "1" },
                    {
                      label: "球鞋",
                      value: "2",
                    },
                  ],
                },
              ]}
            />
            <Checkbox>checkbox</Checkbox>
          </Flex>
          <Flex gap={10} className={"my-2 w-full"}>
            <CheckBoxGroupDemo />
          </Flex>
        </ConfigProvider>
      </div>
    </Layout>
  );
};
const CheckBoxGroupDemo = () => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <div>
      <div className={"mb-1"}>
        <Checkbox
          indeterminate={value.length > 0 && value.length !== options.length}
          onCheckedChange={(checked) => {
            console.log(111, checked);
            if (checked) {
              setValue(
                options
                  .filter((option) => !option.disabled)
                  .map((option) => option.value),
              );
            } else {
              setValue([]);
            }
          }}
        >
          全选
        </Checkbox>
      </div>
      <CheckBoxGroup
        // className={"w-full"}
        value={value}
        onChange={(checked) => {
          setValue(checked as string[]);
        }}
        option={options as any}
        // option={[
        //   { label: "苹果", value: "apple" },
        //   { label: "橙子", value: "orange" },
        //   { label: "香蕉", value: "banana" },
        // ]}
      />
    </div>
  );
};
export default ConfigProviderPage;
