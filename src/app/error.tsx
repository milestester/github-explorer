"use client";

import { Text } from "@/components/Typography";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-32">
      <Text variant="h1">Something went wrong</Text>
      <Text variant="muted">An unexpected error occurred.</Text>
    </div>
  );
}
