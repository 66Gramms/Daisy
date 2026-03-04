# Internals

## Request lifecycle

```
Route (+ validate middleware) → Controller → Service → SQLite
```

Routes only wire paths to controllers. Validation happens via middleware before the controller runs, so controllers can trust `req.body` is already the correct DTO type. Controllers handle HTTP concerns (status codes, responses). Services handle SQL and nothing else.

## Key design decisions

**All modules share a single `sqlite3.Database` connection** exported from `src/db.ts`. This ensures transactions in controllers (e.g. `RegisterParty`) correctly wrap service calls, since everyone operates on the same connection.

**No backend auth middleware.** JWT tokens are issued on login but never validated on subsequent requests. Route protection relies entirely on the frontend middleware checking for cookie existence. Any backend route can be hit directly without authentication.

**Username uniqueness is case-insensitive** via `COLLATE NOCASE` on the `username` column, so "Alice" and "alice" are treated as the same user for both insertion and lookup.

## Validation

The `validate` middleware uses Zod v4, which has `error.issues` (not `error.errors` like v3). On validation failure it returns `400` with `{ error, details: [{ path, message }] }`.

DTOs define both the Zod schema (runtime validation) and the TypeScript type (via `z.infer`). All DTOs are barrel-exported from `dtos/index.ts`.

## Logging

`createContextLogger("MyModule")` gives you a scoped logger that prefixes output with `[MyModule]`. The root `logger` is at debug level by default.

## Adding a new endpoint

1. DTO in `src/dtos/admin/` (schema + inferred type), export from `dtos/index.ts`
2. Service in `src/services/admin/` (Promise-wrapped SQL)
3. Controller in `src/controllers/admin/` (cast `req.body` to the request DTO)
4. Route in `src/routes/admin/` with `validate(Schema)` middleware
5. Mount new router files in `server.ts` if needed
6. Update `src/openapi.json`
