"use client";

import { type ReactNode } from "react";
import { useSearchNavigation } from "./hooks/useSearchNavigation";
import { SearchInput } from "./SearchInput";
import { UserListSkeleton } from "./UserListSkeleton";

interface Props {
  children: ReactNode;
  hasSearch: boolean;
}

export function SearchContainer({ children, hasSearch }: Props) {
  const { handleSearch, isPending, optimisticHasSearch } = useSearchNavigation({
    initialHasSearch: hasSearch,
  });

  return (
    <>
      <SearchInput onSearch={handleSearch} isPending={isPending} />
      {isPending && optimisticHasSearch ? (
        <div className="mt-8">
          <UserListSkeleton />
        </div>
      ) : (
        children
      )}
    </>
  );
}
