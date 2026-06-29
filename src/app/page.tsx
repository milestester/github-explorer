import { Suspense } from "react";
import { SearchContainer } from "@/features/search/SearchContainer";
import { UserList } from "@/features/profiles/user/UserList";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Suspense>
        <SearchContainer>
          <UserList />
        </SearchContainer>
      </Suspense>
    </main>
  );
}
