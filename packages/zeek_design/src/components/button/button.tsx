import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { SizeType } from "@/components/config-provider/SizeContext.tsx";

type MergedHTMLAttributes = Omit<
  HTMLAttributes<HTMLElement> & ButtonHTMLAttributes<HTMLElement>,
  "type"
>;
export interface BaseButtonProps {
  icon?: ReactNode;
  disabled?: boolean;
  size?: SizeType;
}
export interface ButtonProps extends BaseButtonProps, MergedHTMLAttributes {
  autoInsertSpace?: boolean;
}
const Button = (props: ButtonProps) => {
  const { ...restProps } = props;

  return <button {...restProps} />;
};
export default Button;
