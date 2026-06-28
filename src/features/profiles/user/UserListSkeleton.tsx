import { Skeleton } from "@/components/Skeleton";
import { MAX_USER_RESULTS } from "@/lib/constants";

export function UserListSkeleton() {
  return (
    <ul className="flex flex-col gap-3">
      {Array.from({ length: MAX_USER_RESULTS }).map((_, i) => (
        <li
          key={i}
          className="border-brand-outline-variant/40 bg-brand-surface-lowest rounded-brand-lg border p-4"
        >
          <div className="flex items-center gap-4">
            <Skeleton className="rounded-brand-full size-12" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
