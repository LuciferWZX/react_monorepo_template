import { cva } from "class-variance-authority";
export const buttonVariants = cva(
  `bg-background inline-flex items-center justify-center whitespace-nowrap rounded-md gap-1 text-sm font-medium disabled:pointer-events-none disabled:opacity-50 zeek-outline`,
  {
    variants: {
      type: {
        default:
          "border border-border hover:text-primary hover:border-primary hover:bg-background/80",
        primary: "bg-primary text-primary-foreground hover:bg-primary/80",
        danger:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80",
      },
      size: {
        small: " h-6 min-w-6 text-xs px-2 ",
        middle: " h-8 min-w-8 py-1 px-4",
        large: " h-10 min-w-10 text-base py-2 px-4",
      },
      variant: {
        solid: "border-none",
        outlined: "border border-border bg-unset text-unset hover:bg-unset ",
        dashed: "border border-dashed bg-unset text-unset hover:bg-unset ",
        filled: "border-none hover:text-unset hover:bg-unset",
        text: "border-none bg-unset text-unset hover:text-unset hover:bg-unset",
        link: "border-none bg-unset text-unset hover:bg-inherit",
      },
    },
    defaultVariants: {
      type: "default",
      size: "middle",
    },
  },
);
export const buttonIconVariants = cva("p-0", {
  variants: {
    size: {
      small: "h-3.5 w-3.5 ",
      middle: "h-3.5 w-3.5 ",
      large: "h-4 w-4 ",
    },
  },
});
