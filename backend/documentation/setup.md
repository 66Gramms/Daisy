# Setup

## Quick Start

```bash
npm install
npm run dev       # hot reload via nodemon + ts-node
npm run type:check
```

Requires a `.env` with `PORT` (default 5000) and `JWT_SECRET`.

## Database

SQLite file-based at `backend/database.sqlite`, auto-created on first startup from `database.sqlite.init.sql`.

There are no migrations. The schema uses `IF NOT EXISTS`, so it runs safely on every boot. If you need to change the schema, delete the `.sqlite` file and restart.

The `party` table only ever has one row (or zero). The party name is the primary key itself, not an auto-increment ID. This is intentional since the app models a single party.

`accessRights` is an integer column (not an enum at the DB level). The mapping lives in `consts.ts` and must stay in sync manually: 0=banned, 1=user, 2=admin, 3=superAdmin.
