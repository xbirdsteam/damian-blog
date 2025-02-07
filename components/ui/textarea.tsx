import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, disabled, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex py-[13px] px-[14px] w-full rounded-[4px] border border-neutral-border text-base text-neutral-primary-text placeholder:text-[#C5C2C5] focus:outline-none resize-none min-h-[120px]",
        disabled
          ? "bg-neutral-background cursor-not-allowed"
          : "bg-white hover:border-neutral-text-disable focus:border-neutral-primary-text",
        className
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
