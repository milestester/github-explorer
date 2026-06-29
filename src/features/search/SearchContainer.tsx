"use client";

import { type ReactNode } from "react";
import { useSearchNavigation } from "./hooks/useSearchNavigation";
import { SearchInput } from "./SearchInput";
import { SearchHeader } from "./SearchHeader";
import { SearchResultsHeader } from "./SearchResultsHeader";
import { cn } from "@/lib/cn";

interface Props {
  children: ReactNode;
}

export function SearchContainer({ children }: Props) {
  const { handleSearch, isPending, searchQuery, isShowingResults } = useSearchNavigation();

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
        {isShowingResults && (
          <div className="mt-8">
            <SearchResultsHeader searchQuery={searchQuery} onClear={() => handleSearch("")} />
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
