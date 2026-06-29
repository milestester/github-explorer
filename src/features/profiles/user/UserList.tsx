"use client";

import { Text } from "@/components/Typography";
import { UserAccordionList } from "./UserAccordionList";
import { UserListSkeleton } from "./UserListSkeleton";
import { useUserSearch } from "./hooks/useUserSearch";

export function UserList() {
  const { query, data: users, isLoading, isError } = useUserSearch();

  if (isLoading) {
    return <UserListSkeleton />;
  }

  if (isError && !users?.length) {
    return <Text variant="error">Something went wrong. Try again in a moment.</Text>;
  }

  if (!users?.length) {
    return <Text variant="muted">No users found for &ldquo;{query}&rdquo;.</Text>;
  }

  return (
    <>
      {isError && (
        <Text variant="error" className="mb-3">
          Something went wrong. Showing cached results.
        </Text>
      )}
      <UserAccordionList users={users} />
    </>
  );
}
