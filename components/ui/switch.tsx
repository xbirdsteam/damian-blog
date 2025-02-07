"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-[18px] w-[30px] shrink-0 cursor-pointer items-center rounded-full border transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-[#0D0D0D] data-[state=checked]:border-[#0D0D0D]",
      "data-[state=unchecked]:bg-white data-[state=unchecked]:border-[#C5C2C5]",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-[14px] w-[14px] rounded-full shadow-lg ring-0 transition-transform",
        "data-[state=checked]:translate-x-[14px] data-[state=checked]:bg-white",
        "data-[state=unchecked]:translate-x-[2px] data-[state=unchecked]:bg-[#C5C2C5]"
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
