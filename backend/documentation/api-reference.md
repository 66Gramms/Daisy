# API Reference

Interactive docs at `GET /api/docs` (ReDoc) and raw spec at `GET /api/openapi.json` when the server is running.

All routes live under `/api/admin`. Route files define only the suffix; the prefix is applied in `server.ts`.

## POST /api/admin/login

Authenticates a user and returns a JWT (7-day expiry). The JWT payload contains `{ id, accessRights }` but the backend never validates it on subsequent requests.

Returns `401` for both "user not found" and "wrong password" (no distinction exposed to the client).

## POST /api/admin/party/register-party

One-time setup that creates the party and the first superAdmin account. Once a party exists, this endpoint always returns `403`. There is no way to delete a party through the API, so this is effectively a one-shot initialization.

Expects `confirmPassword` to match `password` (validated by Zod refinement).

## GET /api/admin/party/has-party

Returns `{ name: "" }` if no party exists, `{ name: "..." }` if one does. The frontend uses this to decide whether to show the registration form or the login form.

No authentication required (by design, since it needs to be called before any user exists).
