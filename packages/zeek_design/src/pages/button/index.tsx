import { Button, Flex } from "@/components";
import { Atom } from "lucide-react";

const ButtonPage = () => {
  return (
    <Flex vertical={"vertical"} gap={20}>
      default
      <Flex wrap={true} gap={10} align={"center"}>
        <Button>默认</Button>
        <Button size={"small"}>小</Button>
        <Button size={"large"}>大</Button>
        <Button icon={<Atom />}>带文字</Button>
        <Button icon={<Atom />} />
      </Flex>
      danger
      <Flex wrap={true} gap={10} align={"center"}>
        <Button type={"danger"}>默认</Button>
        <Button type={"danger"} size={"small"}>
          小
        </Button>
        <Button type={"danger"} size={"large"}>
          大
        </Button>
        <Button type={"danger"} icon={<Atom />}>
          带文字
        </Button>
        <Button type={"danger"} icon={<Atom />} />
      </Flex>
      <Flex gap={20}>
        variant变体 default
        <Button variant={"solid"}>solid</Button>
        <Button variant={"outlined"}>outlined</Button>
        <Button variant={"dashed"}>dashed</Button>
        <Button variant={"filled"}>filled</Button>
        <Button variant={"text"}>text</Button>
        <Button variant={"link"}>link</Button>
      </Flex>
      <Flex gap={20}>
        variant变体 primary
        <Button type={"primary"} variant={"solid"}>
          solid
        </Button>
        <Button type={"primary"} variant={"outlined"}>
          outlined
        </Button>
        <Button type={"primary"} variant={"dashed"}>
          dashed
        </Button>
        <Button type={"primary"} variant={"filled"}>
          filled
        </Button>
        <Button type={"primary"} variant={"text"}>
          text
        </Button>
        <Button type={"primary"} variant={"link"}>
          link
        </Button>
      </Flex>
      <Flex gap={20}>
        variant变体 danger
        <Button type={"danger"} variant={"solid"}>
          solid
        </Button>
        <Button type={"danger"} variant={"outlined"}>
          outlined
        </Button>
        <Button type={"danger"} variant={"dashed"}>
          dashed
        </Button>
        <Button type={"danger"} variant={"filled"}>
          filled
        </Button>
        <Button type={"danger"} variant={"text"}>
          text
        </Button>
        <Button type={"danger"} variant={"link"}>
          link
        </Button>
      </Flex>
      <Flex wrap={true} gap={10} align={"center"}>
        <Button>按钮1</Button>
        <Button icon={<Atom />} />
        <Button type={"primary"}>primary</Button>
        <Button type={"primary"} icon={<Atom />}>
          icon primary loading
        </Button>
        <Button loading={true} iconPosition={"end"} icon={<Atom />}>
          按钮1
        </Button>
        <Button icon={<Atom />} size={"small"}>
          small
        </Button>
        <Button icon={<Atom />} size={"small"} />
        <Button
          onClick={() => alert("xx")}
          icon={<Atom />}
          size={"large"}
          type={"primary"}
        >
          提交
        </Button>
        <Button size={"middle"}>middle</Button>
        <Button size={"large"}>large</Button>
        <Button asChild={true}>
          <a>link</a>
        </Button>
      </Flex>
    </Flex>
  );
};
export default ButtonPage;
