import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md border px-5 py-3 text-sm font-medium tracking-wide transition duration-300 ease-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-55",
  {
    variants: {
      variant: {
        default:
          "border-borderSubtle bg-transparent text-textPrimary hover:border-accent hover:bg-hoverState hover:text-accent",
        primary: "border-accent bg-accent text-bgSecondary hover:bg-textPrimary hover:text-bgSecondary",
        secondary:
          "border-borderSubtle bg-bgSecondary text-textPrimary hover:border-accent hover:text-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
