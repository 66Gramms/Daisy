# API Client & Server Actions

## Why server actions sit between forms and the API

Server actions exist to handle things that can't (or shouldn't) happen in browser code: setting httpOnly cookies, stripping tokens from responses before they reach the client, and triggering server-side redirects. Every auth-related API call goes through a server action. Non-auth calls (like `getParty()`) can be called directly from server components.

## How `sendRequest` works

All API calls go through `services/api/send-request.ts`. It prepends `NEXT_PUBLIC_API_URL` to the path, sets JSON headers, and disables Next.js caching (`revalidate: 0`). On non-OK responses it throws with the status code in the message, so callers catch errors rather than checking response codes.

API routes are defined as an enum in `services/api/routes.ts`. Each route has a corresponding typed function (e.g., `adminLogin()`, `getParty()`) that wraps `sendRequest` with the correct types and HTTP method.

Response types live in `types.ts` files next to their API functions. These are plain TypeScript interfaces, not Zod schemas (unlike the backend DTOs). The frontend trusts the backend response shape at runtime.

## Adding a new API call

1. Add the path to `ApiRoutes` in `services/api/routes.ts`
2. Add response types in a `types.ts` next to the API function
3. Create the function using `sendRequest<T>()`
4. If the call involves cookies or redirects, wrap it in a server action in `actions/`
5. Otherwise, call it directly from server components or via React Query
