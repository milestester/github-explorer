import { Suspense } from "react";
import { Text } from "@/components/Typography";
import { SearchContainer } from "@/features/search/SearchContainer";
import { UserList } from "@/features/profiles/user/UserList";
import { UserListSkeleton } from "@/features/profiles/user/UserListSkeleton";

interface Props {
  searchParams: Promise<{ search?: string }>;
}

export default async function Home({ searchParams }: Props) {
  const { search } = await searchParams;
  const hasSearch = !!search;

  const loadingFallback = <UserListSkeleton />;

  return (
    <main className="flex flex-col">
      <SearchContainer hasSearch={hasSearch} loadingFallback={loadingFallback}>
        {hasSearch ? (
          <div className="mt-8">
            <Text variant="label" className="mb-4 block">
              Results for &ldquo;{search}&rdquo;
            </Text>
            <Suspense fallback={loadingFallback}>
              <UserList query={search!} />
            </Suspense>
          </div>
        ) : null}
      </SearchContainer>
    </main>
  );
}
