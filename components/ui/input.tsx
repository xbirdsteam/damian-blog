import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, disabled, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex py-[13px] px-[14px] h-[50px] w-full rounded-[4px] border border-neutral-border text-base text-neutral-primary-text placeholder:text-[#C5C2C5] focus:outline-none",
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
  }
);
Input.displayName = "Input";

export { Input };
