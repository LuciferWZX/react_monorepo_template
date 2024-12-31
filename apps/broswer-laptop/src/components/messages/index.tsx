import { ReactNode, useMemo } from "react";
import { match } from "ts-pattern";
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";

interface MessageProps {
  type?: "default" | "warning" | "info" | "success" | "error";
  children?: ReactNode;
  handleClose?: () => void;
}
export const Message = (props: MessageProps) => {
  const { type, handleClose, children } = props;
  const PreIcon = useMemo(() => {
    return match(type)
      .with("success", () => {
        return CircleCheck;
      })
      .with("error", () => {
        return CircleAlert;
      })
      .with("warning", () => TriangleAlert)
      .with("info", () => Info)
      .otherwise(() => undefined);
  }, [type]);
  return (
    <div className="z-[100] max-w-[400px] rounded-lg border border-border bg-background px-4 py-3 shadow-lg shadow-black/5">
      <div className="flex gap-2">
        <p className="grow text-sm">
          {PreIcon && (
            <PreIcon
              className={cn("-mt-0.5 me-3 inline-flex text-red-500", {
                "text-green-500": type === "success",
              })}
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          )}
          {children}
        </p>
        <Button
          variant="ghost"
          className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
          aria-label="Close notification"
          onClick={handleClose}
        >
          <X
            size={16}
            strokeWidth={2}
            className="opacity-60 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  );
};
