import { Text } from "@/components/Typography";

export function SearchHeader() {
  return (
    <div className="mb-10">
      <Text variant="h1" className="mb-2">
        Search GitHub users
      </Text>
      <Text variant="muted">Find a user and explore their public repositories.</Text>
    </div>
  );
}
