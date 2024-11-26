import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { ComponentProps, forwardRef, useMemo, useState } from "react";
import { match, P } from "ts-pattern";

export type VisibilityToggle = {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
};
interface PasswordInputProps extends ComponentProps<"input"> {
  visibilityToggle?: boolean | VisibilityToggle;
}
const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const { visibilityToggle, ...restProps } = props;
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const toggleVisibility = () => setIsVisible((prevState) => !prevState);
    const mergedType = useMemo(() => {
      return match(visibilityToggle)
        .with(false, () => "password")
        .with({ visible: P.not(undefined) }, (_config) => {
          return _config.visible ? "text" : "password";
        })
        .otherwise(() => (isVisible ? "text" : "password"));
    }, [isVisible, visibilityToggle]);
    return (
      <div className="relative">
        <Input {...restProps} ref={ref} type={mergedType} />
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
          aria-controls="password"
        >
          {isVisible ? (
            <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
          ) : (
            <Eye size={16} strokeWidth={2} aria-hidden="true" />
          )}
        </button>
      </div>
    );
  },
);
export default PasswordInput;
