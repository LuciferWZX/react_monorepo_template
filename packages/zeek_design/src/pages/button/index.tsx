import { Button, Flex } from "@/components";
import { Atom } from "lucide-react";

const ButtonPage = () => {
  return (
    <div>
      default
      <Flex wrap={true} gap={10} align={"center"}>
        <Button>默认</Button>
        <Button size={"small"}>小</Button>
        <Button size={"large"}>大</Button>
        <Button icon={<Atom />}>带文字</Button>
        <Button icon={<Atom />} />

        <Button variant={"dashed"}>dashed</Button>
        <Button variant={"filled"}>filled</Button>
      </Flex>
      <Flex wrap={true} gap={10} align={"center"}>
        <Button>按钮1</Button>
        <Button icon={<Atom />} />
        <Button type={"primary"}>primary</Button>
        <Button type={"primary"} icon={<Atom />}>
          icon primary
        </Button>
        <Button icon={<Atom />}>按钮1</Button>
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
    </div>
  );
};
export default ButtonPage;
