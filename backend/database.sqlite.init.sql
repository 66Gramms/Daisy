-- SQLite database initialization script
-- You can add table creation statements here

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    accessRights INTEGER NOT NULL DEFAULT 1 -- 0: banned, 1: user, 2: admin, 3: superadmin
);

-- Add more tables as needed
