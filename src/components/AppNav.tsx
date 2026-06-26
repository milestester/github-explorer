import Link from "next/link";
import { GitBranch } from "lucide-react";

export function AppNav() {
  return (
    <nav className="border-brand-outline-variant/50 bg-brand-surface-lowest border-b">
      <div className="mx-auto flex h-14 items-center px-6 md:px-12">
        <Link
          href="/"
          className="text-brand-primary flex items-center gap-2 font-semibold tracking-tight"
        >
          <GitBranch className="size-6" />
          <span className="text-xl">GitHub Explorer</span>
        </Link>
      </div>
    </nav>
  );
}
