// Dependencies: pnpm install lucide-react

import { Button } from "@/components/ui/button";
import { CircleCheck, CircleX, X } from "lucide-react";
import { MouseEventHandler, ReactNode } from "react";
import { match } from "ts-pattern";
interface MessageProps {
  type?: "success" | "error" | "info" | "warning";
  text?: ReactNode;
  handleClose?: MouseEventHandler<HTMLButtonElement>;
}

interface BaseMessageProps {
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
const ErrorMessage = (props: BaseMessageProps) => {
  const { children, onClick } = props;
  return (
    // To make the notification fixed, add classes like `fixed bottom-4 right-4` to the container element.
    <div className="z-[100] max-w-[400px] rounded-lg border border-border bg-background px-4 py-3 shadow-lg shadow-black/5">
      <div className="flex gap-2">
        <p className="grow text-sm">
          <CircleX
            className="-mt-0.5 me-3 inline-flex text-red-500"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          {children}
        </p>
        <Button
          variant="ghost"
          className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
          aria-label="Close notification"
          onClick={onClick}
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
const SuccessMessage = (props: BaseMessageProps) => {
  const { children, onClick } = props;
  return (
    // To make the notification fixed, add classes like `fixed bottom-4 right-4` to the container element.
    <div className="z-[100] max-w-[400px] rounded-lg border border-border bg-background px-4 py-3 shadow-lg shadow-black/5">
      <div className="flex gap-2">
        <p className="grow text-sm">
          <CircleCheck
            className="-mt-0.5 me-3 inline-flex text-emerald-500"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          {children}
        </p>
        <Button
          variant="ghost"
          className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
          aria-label="Close notification"
          onClick={onClick}
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
export const Message = (props: MessageProps) => {
  const { type, text, handleClose } = props;
  return match(type)
    .with("error", () => (
      <ErrorMessage onClick={handleClose}>{text}</ErrorMessage>
    ))
    .with("success", () => (
      <SuccessMessage onClick={handleClose}>{text}</SuccessMessage>
    ))
    .otherwise(() => "unknown type");
};
