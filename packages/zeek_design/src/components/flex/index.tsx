import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils.ts";
type JustifyContentType =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";
type AlignItemsType =
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline"
  | "stretch";
interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  gap?: number;
  vertical?: "horizontal" | "vertical";
  justify?: JustifyContentType;
  align?: AlignItemsType;
  wrap?: boolean;
}
const Flex = (props: FlexProps) => {
  const {
    children,
    align,
    wrap,
    justify,
    style,
    className,
    vertical,
    gap,
    ...restProps
  } = props;
  return (
    <div
      {...restProps}
      className={cn(
        `flex w-fit`,
        {
          "flex-col": vertical === "vertical",
          "flex-wrap": wrap,
        },
        className,
      )}
      style={{
        alignItems: align ?? "center",
        justifyContent: justify,
        gap: gap ?? 5,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
export default Flex;
