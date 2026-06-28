"use client";

import { Star, GitFork } from "lucide-react";
import { Text } from "@/components/Typography";
import { useUserRepos } from "./hooks/useUserRepos";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import { RepoListSkeleton } from "./RepoListSkeleton";

interface Props {
  username: string;
}

export function RepoList({ username }: Props) {
  const { repos, isLoading, isError, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useUserRepos(username);

  const { scrollContainerRef, loadMoreRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  if (isLoading) {
    return <RepoListSkeleton />;
  }

  if (isError) {
    return <Text variant="muted">Failed to load repositories. Try again in a moment.</Text>;
  }

  if (repos.length === 0) {
    return <Text variant="muted">No public repositories for {username}.</Text>;
  }

  const endOfRepositoryList = !hasNextPage;

  return (
    <div ref={scrollContainerRef} className="h-64 overflow-y-auto">
      <ul className="flex flex-col gap-3 pb-4">
        {repos.map((repo) => (
          <li
            key={repo.id}
            className="border-brand-outline-variant/40 bg-brand-surface-lowest rounded-brand-lg border p-4"
          >
            <Text variant="h3" as="span" className="block truncate">
              {repo.name}
            </Text>
            {repo.description && (
              <Text variant="muted" className="mt-1 line-clamp-2">
                {repo.description}
              </Text>
            )}
            <div className="mt-2 flex gap-4">
              {repo.language && <Text variant="label">{repo.language}</Text>}
              <Text variant="label" className="flex items-center gap-1">
                <Star size={12} className="text-yellow-400" />
                {repo.stars}
              </Text>
              <Text variant="label" className="flex items-center gap-1">
                <GitFork size={12} className="text-sky-400" />
                {repo.forks}
              </Text>
            </div>
          </li>
        ))}
        <div ref={loadMoreRef} className="py-2 text-center">
          {isFetchingNextPage && <Text variant="muted">Loading more…</Text>}
          {endOfRepositoryList && <Text variant="muted">End of repository list.</Text>}
        </div>
      </ul>
    </div>
  );
}
