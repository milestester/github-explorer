import { SearchContainer } from "@/features/search/SearchContainer";
import { UserList } from "@/features/profiles/user/UserList";

export default function Home() {
  return (
    <main className="flex flex-col">
      <SearchContainer>
        <UserList />
      </SearchContainer>
    </main>
  );
}
