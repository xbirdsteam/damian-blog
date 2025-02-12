import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";
import { ArrowRightIconV1 } from "../icons/ArrowRightIconV1";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-bold transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-primary-text text-white rounded-[4px] h-[50px] px-6 hover:opacity-90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "text-neutral-primary-text bg-white rounded-[4px] h-[50px] px-6 hover:opacity-90 border border-neutral-primary-text",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
  children: React.ReactNode;
  className?: string;
  withArrow?: boolean;
  arrowColor?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      href,
      children,
      withArrow = false,
      arrowColor = "white",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const buttonClasses = cn(buttonVariants({ variant, size, className }));

    if (href) {
      return (
        <Link prefetch href={href} className={buttonClasses}>
          {children}
          {withArrow && <ArrowRightIconV1 color={arrowColor} />}
        </Link>
      );
    }

    return (
      <Comp className={buttonClasses} ref={ref} {...props}>
        {children}
        {withArrow && <ArrowRightIconV1 color={arrowColor} />}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
