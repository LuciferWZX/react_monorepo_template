import { CSSProperties } from "react";
import { ButtonProps } from "@/components/button/button.tsx";

export interface ComponentStyleConfig {
  className?: string;
  style?: CSSProperties;
}
export type ButtonConfig = ComponentStyleConfig &
  Pick<ButtonProps, "autoInsertSpace">;
export interface ConfigConsumerProps {
  button?: ButtonConfig;
}
