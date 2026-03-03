import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, "aria-invalid": ariaInvalid, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "bottom-border-input min-h-[120px] resize-y",
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
Textarea.displayName = "Textarea";

export { Textarea };
