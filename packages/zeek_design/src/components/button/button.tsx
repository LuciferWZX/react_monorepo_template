import {
  ButtonHTMLAttributes,
  cloneElement,
  forwardRef,
  HTMLAttributes,
  isValidElement,
  ReactNode,
  useContext,
} from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/styles/variants";
import { cn } from "@/lib/utils.ts";
import useSize from "@/components/config-provider/hooks/useSize.ts";
import { buttonIconVariants } from "@/components/styles/variants/button.ts";
import { LoaderCircle } from "lucide-react";
import { DisabledContext } from "@/components/config-provider/DisabledContext.tsx";
type MergedHTMLAttributes = Omit<
  HTMLAttributes<HTMLElement> & ButtonHTMLAttributes<HTMLElement>,
  "type"
>;
export interface BaseButtonProps {
  icon?: ReactNode;
  disabled?: boolean;
  loading?: boolean | { delay?: number };
  iconPosition?: "start" | "end";
  block?: boolean;
  htmlType?: "button" | "submit" | "reset";
  // variant: "solid" | "outlined" | "dashed" | "filled" | "text" | "link";
}
export interface ButtonProps
  extends BaseButtonProps,
    MergedHTMLAttributes,
    VariantProps<typeof buttonVariants> {
  autoInsertSpace?: boolean;
  asChild?: boolean;
}
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    asChild,
    className,
    loading,
    children,
    type = "default",
    variant,
    icon,
    size,
    iconPosition,
    block,
    htmlType = "button",
    disabled: customDisabled,
    ...restProps
  } = props;
  const Comp = asChild ? Slot : "button";
  const mergedSize = useSize((ctxSize) => size ?? ctxSize) ?? "middle";
  const disabled = useContext(DisabledContext);
  const mergedDisabled = loading === true ? true : (customDisabled ?? disabled);
  const iconType = loading ? "loading" : icon;
  const iconOnly = !children && children !== 0 && !!iconType;
  return (
    <Comp
      ref={ref}
      disabled={mergedDisabled}
      type={htmlType}
      className={cn(
        "transition-all duration-150",
        buttonVariants({
          type: type ?? "default",
          className,
          variant,
          size: mergedSize,
        }),
        {
          "px-0": iconOnly,
          "bg-foreground text-background hover:text-background hover:bg-foreground/80":
            type === "default" && variant === "solid",
          "bg-muted hover:bg-muted/80":
            type === "default" && variant === "filled",
          "hover:bg-muted": type === "default" && variant === "text",
          //---------------primary
          "bg-primary-fade text-primary hover:bg-primary-fade/80":
            type === "primary" && variant === "filled",
          "border-primary text-primary hover:text-primary/80 hover:border-primary/80":
            type === "primary" &&
            (variant === "outlined" || variant === "dashed"),
          "hover:bg-primary-fade text-primary":
            type === "primary" && variant === "text",
          "text-primary": type === "primary" && variant === "link",
          //-----------danger
          "border-destructive text-destructive hover:text-destructive/80 hover:border-destructive/80":
            type === "danger" &&
            (variant === "outlined" || variant === "dashed"),
          "bg-destructive-fade text-destructive hover:bg-destructive-fade/80":
            type === "danger" && variant === "filled",
          "hover:bg-destructive-fade text-destructive":
            type === "danger" && variant === "text",
          "text-destructive": type === "danger" && variant === "link",
          //-------------------------------------------------
          "flex-row-reverse": iconPosition === "end",
          "w-full": block,
        },
      )}
      {...restProps}
    >
      {(icon || loading) && (
        <span className={cn(buttonIconVariants({ size: mergedSize }))}>
          {loading ? (
            <LoaderCircle
              className={cn(
                buttonIconVariants({ size: mergedSize }),
                "animate-spin",
              )}
            />
          ) : isValidElement(icon) ? (
            cloneElement(icon, {
              className: cn(
                buttonIconVariants({ size: mergedSize }),
                icon.props.className,
              ),
            } as HTMLAttributes<unknown>)
          ) : (
            icon
          )}
        </span>
      )}
      <Slottable>
        <span className={"flex-1 text-start truncate"}>{children}</span>
      </Slottable>
    </Comp>
  );
});
export default Button;
