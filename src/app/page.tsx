import { Suspense } from "react";
import { Text } from "@/components/Typography";
import { SearchContainer } from "@/features/search/SearchContainer";
import { UserList } from "@/features/search/UserList";
import { UserListSkeleton } from "@/features/search/UserListSkeleton";

interface Props {
  searchParams: Promise<{ search?: string; user?: string }>;
}

export default async function Home({ searchParams }: Props) {
  const { search } = await searchParams;
  const hasSearch = !!search;

  return (
    <main className="flex flex-col">
      <SearchContainer hasSearch={hasSearch}>
        {hasSearch ? (
          <div className="mt-8">
            <Text variant="label" className="mb-4 block">
              Results for &ldquo;{search}&rdquo;
            </Text>
            <Suspense fallback={<UserListSkeleton />}>
              <UserList query={search!} />
            </Suspense>
          </div>
        ) : null}
      </SearchContainer>
    </main>
  );
}
