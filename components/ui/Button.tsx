"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      // Blue CTA button, canonical style (used for main actions like \"Quero investir em Portugal\" / \"Entre em contacto\")
      primary:
        "bg-[#1c2544] text-white hover:bg-[#2a3558] shadow-sm focus:ring-secondary-400",
      // White button – secondary style on light or dark backgrounds
      secondary:
        "bg-white text-[#1c2544] border border-[#1c2544] hover:bg-[#f3f9f0] focus:ring-secondary-400 shadow-sm",
      // Outline – transparent background with blue border/text, same hover as secondary
      outline:
        "bg-transparent text-[#1c2544] border border-[#1c2544] hover:bg-[#f3f9f0] focus:ring-secondary-400",
      // Ghost – text-only style with subtle hover
      ghost:
        "bg-transparent text-[#1c2544] hover:bg-[#f3f9f0] focus:ring-secondary-400 border border-transparent",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        className: cn(baseStyles, variants[variant], sizes[size], className),
      });
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
