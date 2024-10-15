import { useState } from "react";
import { Chain } from "@/lib/Chain.ts";
import { Button } from "@/components";
import { BaggageClaim } from "lucide-react";

const ChainPage = () => {
  const [chain] = useState<Chain>(new Chain());
  const [n, setN] = useState(1);

  const test = (chainId: string) => {
    console.log("当前chainId:", chainId, "执行n:", n);
    setN((oldN) => oldN + 1);
  };
  console.log(444, n);
  return (
    <div>
      chain page
      <Button
        icon={<BaggageClaim />}
        type={"primary"}
        variant={"filled"}
        size={"small"}
        onClick={async () => {
          console.log("开始");
          await chain.repeatExecute(4, test, {
            // repeat: 4,
          });
          console.log("结束");
        }}
      >
        执行
      </Button>
    </div>
  );
};
export default ChainPage;
