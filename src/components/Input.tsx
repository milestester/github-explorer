import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "border-brand-outline-variant text-brand-on-surface placeholder:text-brand-on-surface-variant focus:border-brand-primary focus:ring-brand-primary/20 rounded-brand-md h-10 border bg-white px-4 text-sm outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
