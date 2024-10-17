import {
  Button,
  Combobox,
  ConfigProvider,
  Flex,
  TextInput,
  useTheme,
} from "@/components";
import { useState } from "react";
import { SizeType } from "@/components/config-provider/SizeContext.tsx";
import { Theme } from "@/components/theme-provider";
import NumberInput from "../../components/input/NumberInput.tsx";

const ConfigProviderPage = () => {
  const [disabled, setDisabled] = useState(false);
  const [size, setSize] = useState<SizeType>(undefined);
  const { setTheme } = useTheme();
  return (
    <div className={"p-4"}>
      <label>
        <input
          type={"number"}
          onChange={(event) => {
            const root = document.documentElement;
            root.style.setProperty("--radius", `${event.target.value}rem`);
          }}
        />
        <input
          type={"checkbox"}
          checked={disabled}
          onChange={(event) => setDisabled(event.target.checked)}
        />
        禁用
      </label>
      <select
        name="size"
        value={size}
        onChange={(event) => {
          setSize(event.target.value as SizeType);
        }}
      >
        <option value="small">小</option>
        <option value="middle">中</option>
        <option value="large">大</option>
      </select>
      <select
        name="theme"
        onChange={(event) => {
          setTheme(event.target.value as Theme);
        }}
      >
        <option value="light">light</option>
        <option value="dark">dark</option>
        <option value="system">system</option>
      </select>
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
        <Flex gap={10}>
          <Combobox
            option={[
              { label: "香蕉", value: "banana" },
              { label: "苹果", value: "apple" },
            ]}
          />
        </Flex>
      </ConfigProvider>
    </div>
  );
};
export default ConfigProviderPage;
