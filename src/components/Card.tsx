import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface Props {
  variant?: "default" | "clickable";
  icon?: ReactNode;
  selected?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export function Card({ variant = "default", icon, selected, className, children, onClick }: Props) {
  const base =
    "border-brand-outline-variant/40 bg-brand-surface-lowest rounded-brand-lg border p-4";

  if (variant === "clickable") {
    return (
      <button
        onClick={onClick}
        aria-expanded={selected}
        className={cn(
          base,
          "flex w-full cursor-pointer items-center gap-4 transition-colors",
          selected
            ? "bg-brand-surface-low border-brand-primary/30"
            : "hover:border-brand-primary/30 hover:bg-brand-surface-low",
          className
        )}
      >
        <div className="min-w-0 flex-1">{children}</div>
        {icon}
      </button>
    );
  }

  return <div className={cn(base, className)}>{children}</div>;
}
