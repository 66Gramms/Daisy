import express, { Request, Response } from "express";
import sqlite3 from "sqlite3";
import fs from "fs";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

const PORT = process.env.PORT || 5000;
const SECRET_KEY = "mysecretkey";

const db = new sqlite3.Database("./database.sqlite", (err: Error | null) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    const initSql = fs.readFileSync("./database.sqlite.init.sql", "utf8");
    db.exec(initSql, (err: Error | null) => {
      if (err) {
        console.error("Error, couldn't initialize SQL:", err.message);
      } else {
        console.log("Database initialized");
      }
    });
  }
});

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.post("/register", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, email, and password are required." });
  }
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.run(sql, [username, hashedPassword], function (err) {
      if (err) {
        if (err.message.includes("UNIQUE constraint failed")) {
          return res
            .status(409)
            .json({ error: "Username already registered." });
        }
        return res.status(500).json({ error: err.message });
      }
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: Infinity });
      res.status(201).json({ token, user: { id: this.lastID, username } });
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

app.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  const sql = "SELECT id, username, email, password FROM users WHERE email = ?";
  db.get(sql, [email], async (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    const userRow = row as {
      id: number;
      username: string;
      email: string;
      password: string;
    };
    const match = await bcrypt.compare(password, userRow.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    const { password: _, ...user } = userRow;
    res.json(user);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
