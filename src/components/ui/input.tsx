import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, "aria-invalid": ariaInvalid, ...props }, ref) => {
    return (
      <input
        className={cn(
          "bottom-border-input",
          ariaInvalid ? "border-red-700 focus:border-red-700" : "",
          className
        )}
        ref={ref}
        aria-invalid={ariaInvalid}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
