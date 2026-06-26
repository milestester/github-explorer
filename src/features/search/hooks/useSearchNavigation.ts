"use client";

import { useCallback, useOptimistic, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Options {
  initialHasSearch: boolean;
}

export function useSearchNavigation({ initialHasSearch }: Options) {
  const [isPending, startTransition] = useTransition();
  const [optimisticHasSearch, setOptimisticHasSearch] = useOptimistic(initialHasSearch);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("search", query);
      } else {
        params.delete("search");
      }
      // startTransition marks the navigation as non-urgent so the UI stays
      // interactive while the RSC payload is fetched. isPending is true for
      // the duration, giving us a signal to show the skeleton.
      // setOptimisticHasSearch must be inside the same transition so React
      // knows to hold the optimistic value until the navigation settles —
      // it auto-reverts to the real hasSearch if the navigation fails.
      // When we clear the query, the optimistic value is emptied, and we don't
      // show the skeleton.
      startTransition(() => {
        setOptimisticHasSearch(!!query);
        router.push(`?${params.toString()}`);
      });
    },
    [searchParams, setOptimisticHasSearch, router],
  );

  return { handleSearch, isPending, optimisticHasSearch };
}
