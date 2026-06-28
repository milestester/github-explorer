import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type { GitHubUser } from "@/lib/github/types";
import { Text } from "@/components/Typography";
import { cn } from "@/lib/cn";

interface Props {
  user: GitHubUser;
  isSelected: boolean;
  onClick: () => void;
}

export function UserCard({ user, isSelected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "border-brand-outline-variant/40 ambient-shadow rounded-brand-lg flex w-full cursor-pointer items-center gap-4 border p-4 transition-colors",
        isSelected
          ? "bg-brand-surface-low border-brand-primary/30"
          : "bg-brand-surface-lowest hover:border-brand-primary/30 hover:bg-brand-surface-low"
      )}
    >
      <Image
        src={user.avatarUrl}
        alt={user.username}
        width={48}
        height={48}
        className="rounded-brand-full shrink-0"
      />
      <div className="min-w-0 flex-1 text-left">
        <Text variant="h3" as="span" className="block truncate">
          {user.username}
        </Text>
        <Text variant="label" className="mt-0.5 block truncate">
          github.com/{user.username}
        </Text>
      </div>
      <ChevronDown
        className={cn(
          "shrink-0 transition-all duration-200",
          isSelected ? "text-brand-primary rotate-180" : "text-brand-on-surface/40"
        )}
        size={20}
      />
    </button>
  );
}
