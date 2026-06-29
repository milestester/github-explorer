"use client";

import { X } from "lucide-react";
import { Text } from "@/components/Typography";

interface Props {
  searchQuery: string;
  onClear: () => void;
}

export function SearchResultsHeader({ searchQuery, onClear }: Props) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <Text variant="label">Results for &ldquo;{searchQuery}&rdquo;</Text>
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
