"use client";

import { X } from "lucide-react";
import { Text } from "@/components/Typography";

interface Props {
  query: string;
  onClear: () => void;
}

export function SearchResultsHeader({ query, onClear }: Props) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <Text variant="label">Results for &ldquo;{query}&rdquo;</Text>
      <button
        onClick={onClear}
        className="text-brand-on-surface-variant hover:text-brand-on-surface cursor-pointer"
        aria-label="Clear search results"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
