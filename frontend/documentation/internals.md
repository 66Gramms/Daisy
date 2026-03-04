# Internals

## How the pieces connect

```
App Router page (server component)
  → renders a client component from pages/
    → React Hook Form handles validation
      → submits via server action (actions/)
        → server action calls API service (services/api/)
          → sendRequest() hits the backend
        → server action manages the JWT cookie
      → client updates React Query cache with response
      → client redirects
```

The key split: **App Router `app/` files are thin server components** that fetch initial data and render client components from the `pages/` directory. The `pages/` directory is NOT the Next.js Pages Router, it just holds client-side page-level components with business logic. This separation exists so App Router pages stay as server components while forms and interactivity live in `"use client"` components.

## Authentication flow

1. **Route protection** is handled by `middleware.ts` (Next.js edge middleware). It checks if the `bt` cookie exists for `/admin/*` routes and redirects to `/admin/login` if missing. It does NOT validate the JWT, just checks the cookie is present.

2. **Cookie management** happens in server actions, not in client code. Server actions strip the token from the API response and set it as an httpOnly cookie, so the JWT never reaches the browser's JavaScript.

3. **The admin layout has its own auth check.** `app/admin/layout.tsx` reads the `bt` cookie server-side. If missing, it renders children without the dashboard shell (sidebar, header). This is how the login page gets a clean layout despite living under `/admin/login`.

## First-time setup vs. login

The login page calls `getParty()` at render time to check if a party exists. This determines which form to show:

- **No party yet:** Registration form (creates party + superAdmin in one step)
- **Party exists:** Login form (with a toggle to a user registration form that is currently incomplete/not wired up)

The homepage (`app/(user)/page.tsx`) also uses this check to decide whether to show "Welcome to {party}" or a setup prompt.

## React Query usage

React Query is used for two purposes:

- **Server-side prefetching:** Server components create a `QueryClient`, prefetch data, and pass it to the client via hydration
- **Client-side caching:** After login/registration, user data gets manually set in the `QueryKeys.ME` cache key so downstream components can read it without refetching

Cache keys are centralized in `constants/querykeys.ts`.

## Adding a new page

Any file at `src/app/admin/<route>/page.tsx` is automatically protected by middleware. No extra config needed. Keep it as a server component unless it needs interactivity.

## Adding a new form

Define the Zod schema alongside the page component in `pages/<section>/schema.ts`. Use React Hook Form with `zodResolver`. Submit through a server action if the response involves cookies or redirects; call the API service directly from server components if it doesn't.
