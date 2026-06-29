# GitHub Explorer

Search GitHub users and browse their public repositories.

---

## Stack

| Layer                | Tool                    |
| -------------------- | ----------------------- |
| Framework            | Next.js 16 (App Router) |
| Language             | TypeScript              |
| Styling              | Tailwind CSS v4         |
| Data fetching        | TanStack Query v5       |
| Testing              | Jest + Testing Library  |
| Linting / formatting | ESLint + Prettier       |

---

## Getting started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

**Optional:** set a GitHub personal access token to increase API rate limits.

```bash
# .env.local
GITHUB_TOKEN=ghp_...
```

The app works without a token — unauthenticated rate limits are enough for normal use.

---

## Architecture

The project follows [Feature-Sliced Design](https://feature-sliced.design/): code is grouped by feature first, then by layer. Purely presentational primitives live in `components/`; everything with business logic belongs in a feature. The key constraint — features must not import from other features — is enforced by an ESLint `no-restricted-imports` rule, so cross-feature coupling is a lint error rather than a convention.

**Why FSD?**

- **Discoverability** — it's clear which directory owns a given piece of behaviour. You know where to look without tracing imports.
- **Separation of concerns** — all business logic for a feature lives in one place, making it straightforward to test, change, or remove in isolation.
- **Scalability** — avoids the common failure mode of a flat `components/` directory that grows into an unnavigable list of unrelated files. Features staying in their own slice also reduces merge conflicts as the team and codebase grow.

```
src/
├── app/              # Next.js routes and layout
├── features/
│   ├── search/       # Search input, URL state, navigation hook
│   └── profiles/
│       ├── user/     # User search results, accordion list
│       └── repos/    # Per-user repo list with pagination
├── components/       # Shared UI primitives (Button, Card, Input, …)
└── lib/
    └── github/       # API client, isolated from the rest of the app
        ├── githubApi.ts        # Single class — only entry point for GitHub calls
        ├── githubApi.dto.ts    # Raw API response shapes
        ├── githubApi.mapper.ts # DTO → domain type transformations
        ├── githubApi.error.ts  # Typed error class
        └── types.ts            # Domain types consumed by the UI
```

### API client encapsulation

The GitHub API client is fully encapsulated in `src/lib/github/`. Nothing outside that folder imports DTOs or raw response shapes — all consumers receive mapped domain types. This means the GitHub API response format can change without touching feature code.

### Server Actions as a credential boundary

Repo fetching uses Next.js Server Actions (`features/profiles/repos/actions.ts`). This keeps `GITHUB_TOKEN` server-side — it never appears in the client bundle — while still allowing TanStack Query to call the action from the browser like a normal async function.

### URL-driven search state

The search query lives in `?search=` rather than React state. This makes results shareable and bookmarkable, and eliminates any sync between URL and UI state — the URL _is_ the state.

### Component library

A small component library (`Button`, `Input`, `Card`, `Text`, `Skeleton`) was built from the start. The initial setup takes longer, but pays off quickly: new features can be built faster using consistent, already-styled primitives, the design token system enforces a uniform theme throughout, and there's a clear path to extend the library as the app grows. It also improves readability — component names in JSX communicate intent without needing to decode a configuration of utility classes.

### Custom hooks for business logic

Logic is extracted into custom hooks (`useUserSearch`, `useUserRepos`, `useInfiniteScroll`, `useSearchNavigation`) rather than living inline in components. This keeps components readable and focused on rendering, and makes the logic independently testable.

### Data fetching flow

User types into the search input — local state only, no fetching yet. On submit, `router.push(?search=example)` updates the URL. The client component reads `?search` and passes it to TanStack Query, which fetches up to 5 users and caches them for 5 minutes.

`RepoList` is only mounted when a user expands their accordion row, so no repo fetching happens on page load. On first expand, TanStack Query fires the initial request via a Server Action. As the user scrolls, an Intersection Observer watches an empty element at the bottom of the list — when it enters the scrollable container's viewport, `fetchNextPage()` is called and new repos are appended. The observer is scoped to the scroll container rather than the page, so it triggers at the right moment regardless of page scroll position.

Collapsing and re-expanding a row serves results instantly from the React Query cache (staleTime: 5 minutes) — no re-fetch.

#### Client vs Server components

The initial plan was to use Server Components and SSR for the first user list fetch — shipping less JS to the client and demonstrating the RSC model. It became clear though that search is inherently client-driven: results depend on user input, not the initial page load. TanStack Query's caching and stale-while-revalidate behaviour also added enough value to justify the client-side approach. Keeping everything in one data fetching model — rather than mixing RSC fetching with React Query — also simplifies the mental model for anyone working in the codebase.

---

## Design system

Components follow [Material Design 3](https://m3.material.io/) colour token conventions: semantic role names (`brand-primary`, `brand-on-surface`, `brand-error-container`, …) rather than literal colour names.

Primitive components: `Button`, `Input`, `Card` (static + clickable variants), `Text`, `Skeleton`.

A live reference is available at [/design](http://localhost:3000/design) — colour swatches, typography scale, and all component variants in one place.

---

## CI pipeline

GitHub Actions runs on every pull request to `main`.

Steps (in order):

1. Format check (`prettier --check`)
2. Lint (`eslint`)
3. Type check (`tsc --noEmit`)
4. Tests (`jest`)

---

## Future improvements

- **Virtualise Repo List** — If we are noticing slow down/lag in the UI after opening the 5 users, scrolling down and fetching more repositories, then we could consider adding a virtualisation library. This would help to only render a fixed number of elements to the browser DOM, those which are in viewport. Adding it now would be premature optimisation, for 5 users and their repositories the DOM size shouldn't be an issue.
- **Fetch on hover or equivalent** — If we want to try and show data to the user as quickly as possible, and we're worried about rate limits we could extend the code to prefetch requests. We could do this, for example, as the user hovers over a specific user.
- **GitHub authentication** — authenticate via OAuth or a personal access token to increase API rate limits.
- **E2E tests** — unit tests cover components and hooks; a Playwright/Cypress suite covering the happy path and error states would give higher confidence.
- **Observability** — if we want observability on any unhandled FE errors outside of application logs I would integrate a third party like Sentry.
- **Analytics** — if we want analytics on visitors, bounce rate, etc. we could use Analytics from Google or Vercel's built-in analytics.

---

## Use of AI

AI tooling (Claude Code and Google Stitch) was used throughout development to generate code, especially with scaffolding, boilerplate, building out UI components, helping to define the colour palette and design system.

The architecture, data fetching strategy, and overall behaviour of the
app were decided before any code was written, AI executed that direction
rather than defining it. All generated code was carefully reviewed,
adjusted where necessary, and is fully understood.
