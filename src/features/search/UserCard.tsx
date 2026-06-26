import Link from "next/link";
import Image from "next/image";
import type { GitHubUser } from "@/lib/github/types";
import { Text } from "@/components/Typography";

interface Props {
  user: GitHubUser;
}

export function UserCard({ user }: Props) {
  return (
    <Link
      href={`/?user=${user.login}`}
      className="border-brand-outline-variant/40 bg-brand-surface-lowest hover:border-brand-primary/30 hover:bg-brand-surface-low ambient-shadow rounded-brand-lg flex items-center gap-4 border p-4 transition-colors"
    >
      <Image
        src={user.avatarUrl}
        alt={user.login}
        width={48}
        height={48}
        className="rounded-brand-full shrink-0"
      />
      <div className="min-w-0">
        <Text variant="h3" as="span" className="block truncate">
          {user.login}
        </Text>
        <Text variant="label" className="mt-0.5 block truncate">
          github.com/{user.login}
        </Text>
      </div>
    </Link>
  );
}
