import { useTheme } from "next-themes";
import { Toaster as Sonner, toast as SToast } from "sonner";
import { ComponentProps } from "react";

type ToasterProps = ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();
  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            " group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          error: "!text-red-600 border !border-red-600",
          success: "!text-green-600 border !border-green-600",
          warning: "!text-yellow-600 border !border-yellow-600",
          info: "!text-blue-600 border !border-blue-600",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, SToast };
