import React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "light" | "dark" | "primary";
  container?: boolean;
  children: React.ReactNode;
}

export function Section({
  className,
  variant = "default",
  container = true,
  children,
  ...props
}: SectionProps) {
  const variants = {
    default: "bg-white",
    light: "bg-gray-50",
    dark: "bg-gray-900 text-white",
    primary: "bg-primary text-white",
  };

  return (
    <section
      className={cn("py-16 md:py-24", variants[variant], className)}
      {...props}
    >
      {container ? (
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}

export interface SectionHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
}

export function SectionHeader({
  title,
  description,
  align = "center",
  className,
  ...props
}: SectionHeaderProps) {
  const alignments = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        alignments[align],
        align === "center" && "max-w-3xl mx-auto",
        className
      )}
      {...props}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg md:text-xl text-gray-600">{description}</p>
      )}
    </div>
  );
}

