"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

interface SearchInputProps {
  onSearch: (query: string) => void;
  isPending?: boolean;
}

export function SearchInput({ onSearch, isPending }: SearchInputProps) {
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") ?? "");

  const handleClear = () => {
    setValue("");
    onSearch("");
  };

  const searchValueUnchanged = value.trim() === (searchParams.get("search") ?? "");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(value.trim());
      }}
      className="flex flex-col gap-4 sm:flex-row sm:gap-2"
    >
      <div className="relative w-full sm:flex-1">
        <Input
          type="text"
          placeholder="Search users..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full pr-8"
          disabled={isPending}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            disabled={isPending}
            className="text-brand-on-surface-variant hover:text-brand-on-surface absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer disabled:opacity-50"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      <Button
        type="submit"
        className="w-full justify-center sm:w-auto"
        disabled={isPending || !value || searchValueUnchanged}
      >
        <Search className="size-4" />
        Search
      </Button>
    </form>
  );
}
