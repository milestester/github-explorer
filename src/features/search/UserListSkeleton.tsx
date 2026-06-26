export function UserListSkeleton() {
  return (
    <ul className="flex flex-col gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <li
          key={i}
          className="border-brand-outline-variant/40 bg-brand-surface-lowest rounded-brand-lg border p-4"
        >
          <div className="flex items-center gap-4">
            <div className="bg-brand-surface-variant rounded-brand-full size-12 animate-pulse" />
            <div className="flex flex-col gap-2">
              <div className="bg-brand-surface-variant h-4 w-32 animate-pulse rounded" />
              <div className="bg-brand-surface-variant h-3 w-24 animate-pulse rounded" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
