import { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "h1" | "h2" | "h3" | "body" | "muted" | "label" | "error";

const variantStyles: Record<Variant, string> = {
  h1: "text-2xl font-semibold tracking-tight text-brand-on-surface",
  h2: "text-xl font-semibold tracking-tight text-brand-on-surface",
  h3: "text-base font-semibold text-brand-on-surface",
  body: "text-sm text-brand-on-surface",
  muted: "text-sm text-brand-on-surface-variant",
  label: "text-xs font-medium text-brand-on-surface-variant",
  error: "text-sm text-brand-error",
};

const defaultElements: Record<Variant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  body: "p",
  muted: "p",
  label: "span",
  error: "p",
};

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant: Variant;
  as?: ElementType;
  children: ReactNode;
}

export function Text({ variant, as, children, className, ...props }: TextProps) {
  const Tag = as ?? defaultElements[variant];
  return (
    <Tag className={cn(variantStyles[variant], className)} {...props}>
      {children}
    </Tag>
  );
}
