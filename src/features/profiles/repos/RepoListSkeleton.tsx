import { Skeleton } from "@/components/Skeleton";

export function RepoListSkeleton() {
  return (
    <div className="h-64 overflow-y-hidden">
      <ul className="flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <li
            key={i}
            className="border-brand-outline-variant/40 bg-brand-surface-lowest rounded-brand-lg border p-4"
          >
            <Skeleton className="h-4 w-2/5" />
            <div className="mt-2 space-y-1.5">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </div>
            <div className="mt-3 flex gap-4">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-3 w-8" />
              <Skeleton className="h-3 w-8" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
