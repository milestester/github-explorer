"use client";

import { Text } from "@/components/Typography";
import { UserAccordionList } from "./UserAccordionList";
import { UserListSkeleton } from "./UserListSkeleton";
import { useUserSearch } from "./hooks/useUserSearch";

export function UserList() {
  const { searchQuery, data: users, isLoading, isError, isRateLimit } = useUserSearch();
  const base = isRateLimit ? "GitHub rate limit reached" : "Something went wrong";

  if (isLoading) {
    return <UserListSkeleton />;
  }

  if (isError && !users?.length) {
    return <Text variant="error">{`${base}. Try again in a moment.`}</Text>;
  }

  if (!users?.length) {
    return <Text variant="muted">No users found for &ldquo;{searchQuery}&rdquo;.</Text>;
  }

  return (
    <>
      {isError && (
        <Text variant="error" className="mb-3">
          {`${base}. Showing cached results.`}
        </Text>
      )}
      <UserAccordionList users={users} />
    </>
  );
}
