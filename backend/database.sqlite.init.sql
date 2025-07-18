-- SQLite database initialization script
-- You can add table creation statements here

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
    password TEXT NOT NULL,
);

-- Add more tables as needed
