import { cn } from "@zhixin/shadcn_lib";
import { HTMLAttributes } from "react";
interface NodeBoxProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
}
const NodeBox = (props: NodeBoxProps) => {
  const { selected, children } = props;
  return (
    <div
      className={cn(
        "rounded-lg border px-2 py-1 bg-background w-80 ",
        "bg-gradient-to-b from-primary/40 to-30%",
        {
          "border-primary": selected,
        },
      )}
      onContextMenu={(event) => event.preventDefault()}
    >
      {children}
    </div>
  );
};
export default NodeBox;
