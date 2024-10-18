import {
  Button,
  Checkbox,
  Combobox,
  ConfigProvider,
  Flex,
  NumberInput,
  TextInput,
  useTheme,
} from "@/components";
import { useState } from "react";
import { SizeType } from "@/components/config-provider/SizeContext.tsx";
import { Theme } from "@/components/theme-provider";

const ConfigProviderPage = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [size, setSize] = useState<SizeType>(undefined);
  const { setTheme } = useTheme();
  return (
    <div className={"p-4"}>
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
      </ConfigProvider>
    </div>
  );
};
export default ConfigProviderPage;
