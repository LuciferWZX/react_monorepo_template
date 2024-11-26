import { forwardRef } from "react";
import {
  Button as UIButton,
  ButtonProps as UIButtonProps,
} from "../ui/button.tsx";
import { LoaderCircle } from "lucide-react";
interface ButtonProps extends UIButtonProps {
  loading?: boolean;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { loading, children, disabled, ...restProps } = props;
    const mergedDisabled = loading || disabled;
    return (
      <UIButton {...restProps} disabled={mergedDisabled} ref={ref}>
        {loading && (
          <LoaderCircle
            className="-ms-1 me-2 animate-spin"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        )}
        {children}
      </UIButton>
    );
  },
);
