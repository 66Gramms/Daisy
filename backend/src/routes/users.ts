import { Router, Request, Response } from "express";
import sqlite3 from "sqlite3";

const router = Router();
const db = new sqlite3.Database("./database.sqlite");

router.get("/users", (req: Request, res: Response) => {
  db.all("SELECT id, username, email FROM users", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

router.get("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  db.get(
    "SELECT id, username, email FROM users WHERE id = ?",
    [id],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ error: "User not found." });
      }
      res.json(row);
    }
  );
});

router.put("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, password } = req.body as {
    username?: string;
    email?: string;
    password?: string;
  };
  const sql =
    "UPDATE users SET username = COALESCE(?, username), email = COALESCE(?, email), password = COALESCE(?, password) WHERE id = ?";
  db.run(sql, [username, email, password, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json({ message: "User updated." });
  });
});

export default router;
