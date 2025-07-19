-- SQLite database initialization script
-- You can add table creation statements here

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    accessRights INTEGER NOT NULL DEFAULT 1 -- 0: banned, 1: user, 2: admin, 3: superadmin
);

CREATE TABLE IF NOT EXISTS party (
    name TEXT PRIMARY KEY NOT NULL,
    owner INTEGER NOT NULL,
    FOREIGN KEY (owner) REFERENCES users(id)
)

