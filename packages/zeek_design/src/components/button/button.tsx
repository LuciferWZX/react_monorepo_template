import {
  ButtonHTMLAttributes,
  cloneElement,
  HTMLAttributes,
  isValidElement,
  ReactNode,
} from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/styles/variants";
import { cn } from "@/lib/utils.ts";
import useSize from "@/components/config-provider/hooks/useSize.ts";
import { buttonIconVariants } from "@/components/styles/variants/button.ts";
type MergedHTMLAttributes = Omit<
  HTMLAttributes<HTMLElement> & ButtonHTMLAttributes<HTMLElement>,
  "type"
>;
export interface BaseButtonProps {
  icon?: ReactNode;
  disabled?: boolean;
  loading?: boolean | { delay?: number };
  variant: "solid" | "outlined" | "dashed" | "filled" | "text" | "link";
}
export interface ButtonProps
  extends BaseButtonProps,
    MergedHTMLAttributes,
    VariantProps<typeof buttonVariants> {
  autoInsertSpace?: boolean;
  asChild?: boolean;
}
const Button = (props: ButtonProps) => {
  const {
    asChild,
    className,
    loading,
    children,
    type,
    variant,
    icon,
    size = "middle",
    ...restProps
  } = props;
  const Comp = asChild ? Slot : "button";
  const mergedSize = useSize((ctxSize) => size ?? ctxSize);
  const iconType = loading ? "loading" : icon;
  const iconOnly = !children && children !== 0 && !!iconType;

  return (
    <Comp
      className={cn(
        buttonVariants({ type: type, className, size: mergedSize }),
        {
          "px-0": iconOnly,
          "": type === "default" && variant === "solid",
        },
      )}
      {...restProps}
    >
      {icon && (
        <span className={cn(buttonIconVariants({ size: mergedSize }))}>
          {isValidElement(icon)
            ? cloneElement(icon, {
                className: cn(
                  buttonIconVariants({ size: mergedSize }),
                  icon.props.className,
                ),
              } as HTMLAttributes<unknown>)
            : icon}
        </span>
      )}
      <Slottable>{children}</Slottable>
    </Comp>
  );
};
export default Button;
