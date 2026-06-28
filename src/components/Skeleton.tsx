import { cn } from "@/lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("bg-brand-surface-variant animate-pulse rounded", className)} />;
}
