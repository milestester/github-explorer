import Link from "next/link";
import { Text } from "@/components/Typography";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-32">
      <Text variant="h1">404</Text>
      <Text variant="muted">This page doesn&apos;t exist.</Text>
      <Link
        href="/"
        className="bg-brand-primary hover:bg-brand-primary-dim rounded-brand-md flex h-10 items-center px-4 text-sm font-medium text-white transition-colors"
      >
        Go home
      </Link>
    </div>
  );
}
