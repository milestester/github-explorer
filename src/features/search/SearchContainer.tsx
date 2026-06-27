"use client";

import { type ReactNode } from "react";
import { useSearchNavigation } from "./hooks/useSearchNavigation";
import { SearchInput } from "./SearchInput";
import { UserListSkeleton } from "./UserListSkeleton";
import { SearchHeader } from "./SearchHeader";
import { cn } from "@/lib/cn";

interface Props {
  children: ReactNode;
  hasSearch: boolean;
}

export function SearchContainer({ children, hasSearch }: Props) {
  const { handleSearch, isPending, isLoadingResults, isShowingResults } = useSearchNavigation({
    initialHasSearch: hasSearch,
  });

  return (
    <div
      className={cn(
        "flex flex-col pb-16 transition-[padding-top] duration-500 ease-out",
        isShowingResults ? "pt-16" : "pt-[30vh]"
      )}
    >
      <SearchHeader />
      <SearchInput onSearch={handleSearch} isPending={isPending} />
      <div
        className={cn("transition-opacity duration-200", isPending ? "opacity-0" : "opacity-100")}
      >
        {isPending && isLoadingResults ? (
          <div className="mt-8">
            <UserListSkeleton />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
