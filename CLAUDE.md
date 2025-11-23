# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Daisy is a full-stack TypeScript web application for party management with an admin dashboard. It consists of a Node.js/Express backend API and a Next.js 15 (App Router) frontend.

**Tech Stack:**
- **Backend:** Express.js 5.1, SQLite3, JWT authentication, bcrypt, Zod v4 (validation)
- **Frontend:** Next.js 15.1.4, React 19, Tailwind CSS v4, React Hook Form, Zod, TanStack React Query

## Development Commands

### Backend (from `/backend`)

```bash
npm run dev         # Start development server with hot reload (ts-node + nodemon)
npm run start       # Start production server
npm run type:check  # Run TypeScript type checking without emitting files
```

### Frontend (from `/frontend`)

```bash
npm run dev    # Start Next.js dev server on port 3000
npm run build  # Build production bundle
npm run start  # Start production server
npm run lint   # Run ESLint
```

**Note:** There are no test scripts configured. If tests are needed, they must be set up first.

## Architecture

### Backend Structure (MVC + Layered)

```
backend/src/
├── server.ts           # Express app entry point, CORS, middleware setup
├── routes/             # HTTP endpoint definitions
│   └── admin/
│       ├── index.ts              # POST /api/admin/login (with LoginRequestSchema)
│       └── party/index.ts        # POST /register-party (with RegisterPartyRequestSchema), GET /has-party
├── controllers/        # Request handling & orchestration
│   └── admin/
│       ├── AdminController.ts
│       └── party/PartyController.ts
├── services/          # Database operations (Promise-wrapped sqlite3)
│   └── admin/
│       ├── AdminService.ts       # User queries
│       └── party/PartyService.ts # Party queries
├── dtos/              # Data Transfer Objects with Zod schemas
│   ├── index.ts                  # Barrel export
│   ├── admin/
│   │   ├── login.dto.ts          # LoginRequest/Response schemas & types
│   │   └── party/
│   │       ├── register-party.dto.ts  # RegisterPartyRequest/Response
│   │       └── has-party.dto.ts       # HasPartyResponse
│   └── common/
│       └── error.dto.ts          # ErrorResponse schema
├── middleware/
│   ├── requestLogger.ts          # Logs all requests
│   └── validate.ts               # Zod validation middleware
├── logger.ts          # Custom logger with color support
└── consts.ts          # AccessRights enum (0=banned, 1=user, 2=admin, 3=superAdmin)
```

**Pattern:** Routes (+ Validation) → Controllers → Services → SQLite

**DTOs & Validation:**
- All request/response data types defined as Zod schemas in `/dtos`
- Validation middleware (`validate.ts`) automatically validates request bodies
- Controllers use typed DTOs instead of raw `req.body`
- Zod v4 uses `error.issues` (not `error.errors`) for validation errors

### Frontend Structure (Next.js App Router)

```
frontend/src/
├── app/                          # Next.js App Router (file-based routing)
│   ├── layout.tsx                # Root layout with ReactQueryProvider
│   ├── globals.css               # Tailwind theme (@theme directive)
│   └── admin/
│       ├── layout.tsx            # Admin dashboard shell
│       ├── page.tsx              # Dashboard home
│       └── login/page.tsx        # Login/register page
├── middleware.ts                 # Route guard (redirects unauthenticated to /admin/login)
├── pages/                        # Business logic pages (NOT routes)
│   └── admin/
│       ├── LoginRegister.tsx     # Form orchestration with React Hook Form
│       └── schema.ts             # Zod validation schemas
├── components/
│   ├── molecules/                # Button, Input
│   └── organisms/                # AdminHeader (with logout)
├── actions/                      # Server actions ("use server")
│   ├── admin.ts                  # login, logout
│   └── party.ts                  # registerParty
├── services/api/                 # Type-safe API client
│   ├── routes.ts                 # ApiRoutes enum
│   ├── send-request.ts           # Generic HTTP wrapper
│   └── admin/
│       ├── index.ts              # adminLogin, getMe
│       ├── types.ts              # API response types
│       └── party/
│           ├── index.ts          # registerParty, hasParty
│           └── types.ts
├── hooks/
│   └── useLocalStorage.ts
├── constants/
│   ├── cookies.ts                # Cookie key constants
│   ├── querykeys.ts              # React Query key factory
│   └── common.ts                 # Shared enums
└── providers/
    └── ReactQueryProvider.tsx
```

**Key Patterns:**
- **Server Actions:** Authentication flows use Next.js server actions in `/actions`
- **API Layer:** Centralized in `/services/api` with typed responses
- **Form State:** React Hook Form + Zod validation
- **Server State:** TanStack React Query with keys from `querykeys.ts`
- **Route Protection:** Next.js middleware checks for JWT cookie before admin routes

### Database

**SQLite3** file-based database at `backend/database.sqlite`

**Schema:**
```sql
users (id, username UNIQUE, password, accessRights)
party (name PRIMARY KEY)
```

**Access pattern:** Direct sqlite3 queries wrapped in Promises (no ORM)

### Authentication Flow

1. **First-time setup:** `POST /api/admin/party/register-party` creates superAdmin + party
2. **Login:** `POST /api/admin/login` validates bcrypt hash, returns JWT (7-day expiry)
3. **Token storage:** JWT in httpOnly, secure, sameSite cookie (`bt`)
4. **Route protection:** Frontend middleware redirects if cookie missing
5. **Logout:** Server action deletes cookie, redirects to login

### API Communication

**Backend → Frontend:**
- Backend runs on port 5000
- Frontend calls `NEXT_PUBLIC_API_URL` (localhost:5000 in dev)
- All API routes under `/api/admin/*`
- Responses typed with Zod schemas

**Request flow:**
1. Server action receives form data
2. Calls typed API service function (e.g., `adminLogin()`)
3. `sendRequest()` wrapper adds headers, calls backend
4. Response validated against types
5. JWT extracted and stored in cookie

## Key Files

- `backend/database.sqlite.init.sql` - Database schema definition
- `backend/src/server.ts` - Database initialization on startup
- `frontend/src/middleware.ts` - Authentication guard logic
- `frontend/src/app/globals.css` - Tailwind v4 theme with custom colors (GitHub dark theme inspired)
- `frontend/src/constants/querykeys.ts` - React Query cache key definitions

## Environment Variables

**Backend** (`.env`):
```
PORT=5000
JWT_SECRET=your-secret-key
```

**Frontend** (`.env.local`):
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_TELEMETRY_DISABLED=1
```

## Code Style

- **TypeScript strict mode** enabled in both projects
- **Prettier** for code formatting
- **ESLint** configured for frontend (Next.js config)
- **No emojis** in code or comments
- **Minimal abstractions:** Avoid creating helpers/utilities for one-time operations

## Important Notes

- **No migrations:** Database schema is static in `.init.sql`, recreated if missing
- **No backend auth middleware:** JWT not validated on backend routes (rely on frontend middleware)
- **Deleted routes:** `backend/routes/admin.ts` and `backend/routes/users.ts` were removed (git status shows as deleted)
- **Tailwind v4:** Uses new `@theme` directive in CSS instead of `tailwind.config.js`
- **React 19:** Uses latest React features (new hooks, improved server components)
- **Server components default:** All frontend components are server components unless marked with `"use client"`

## Common Patterns

### Adding a new API endpoint

1. Create DTOs in `backend/src/dtos/...` with Zod schemas:
   ```typescript
   // example.dto.ts
   import { z } from "zod";

   export const ExampleRequestSchema = z.object({
     field: z.string().min(1, "Field is required"),
   });

   export const ExampleResponseSchema = z.object({
     result: z.string(),
   });

   export type ExampleRequest = z.infer<typeof ExampleRequestSchema>;
   export type ExampleResponse = z.infer<typeof ExampleResponseSchema>;
   ```
2. Export DTOs in `backend/src/dtos/index.ts`
3. Create service function in `backend/services/admin/...`
4. Create controller function in `backend/controllers/admin/...` using typed DTOs
5. Create route handler in `backend/routes/admin/...` with validation middleware:
   ```typescript
   import { validate } from "../../middleware/validate";
   import { ExampleRequestSchema } from "../../dtos";

   router.post("/example", validate(ExampleRequestSchema), ExampleController);
   ```
6. Add route enum to `frontend/src/services/api/routes.ts`
7. Create typed API function in `frontend/src/services/api/admin/...`
8. Define types in corresponding `types.ts`
9. Call from server action or component

### Adding a new protected page

1. Create page in `frontend/src/app/admin/[route]/page.tsx`
2. Middleware automatically protects `/admin/*` routes
3. Use server components by default, add `"use client"` only if needed

### Form with validation

1. Define Zod schema in `/pages/.../schema.ts`
2. Use React Hook Form with `zodResolver`
3. Submit via server action in `/actions`
4. Server action calls API service
5. Handle response and navigation
