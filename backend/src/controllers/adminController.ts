import { Request, Response } from "express";
import sqlite3 from "sqlite3";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AccessRights } from "../consts";
import { createContextLogger } from "../logger";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";
const db = new sqlite3.Database("./database.sqlite");
const logger = createContextLogger("admin");

export const registerParty = async (req: Request, res: Response) => {
  const { partyname, username, password, confirmPassword } = req.body;
  if (!partyname || !username || !password || !confirmPassword) {
    return res.status(400).json({
      error:
        "Party name, username, password, and confirm password are required.",
    });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  db.get("SELECT COUNT(*) as count FROM party", [], (countErr, countRow) => {
    if (countErr) {
      return res.status(500).json({ error: countErr.message });
    }
    const count = (countRow as { count: number }).count;
    if (count > 0) {
      return res.status(403).json({
        error:
          "Party already exists. This endpoint should only be called once.",
      });
    }

    const insertParty = () => {
      db.run(
        "INSERT INTO party (name) VALUES (?)",
        [partyname],
        function (partyErr) {
          if (partyErr) {
            return res.status(500).json({ error: partyErr.message });
          }
          logger.info("Super admin and party registered:", username, partyname);
          const token = jwt.sign({ userId: this.lastID }, SECRET_KEY, {
            expiresIn: "7d",
          });
          res.status(201).json({
            token,
            user: { username },
            party: partyname,
          });
        }
      );
    };
    try {
      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(password, saltRounds);
      const userSql =
        "INSERT INTO users (username, password, accessRights) VALUES (?, ?, ?)";
      db.run(
        userSql,
        [username, hashedPassword, AccessRights.superAdmin],
        function (err) {
          if (err) {
            if (err.message.includes("UNIQUE constraint failed")) {
              return res
                .status(409)
                .json({ error: "Username already registered." });
            }
            return res.status(500).json({ error: err.message });
          }
          insertParty();
        }
      );
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });
};

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  const sql =
    "SELECT id, username, password, accessRights FROM users WHERE username = ?";
  db.get(sql, [username], async (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const userRow = row as {
      id: number;
      username: string;
      password: string;
      accessRights: AccessRights;
    };

    const match = await bcrypt.compare(password, userRow.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: userRow.id, accessRights: userRow.accessRights },
      SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    const { password: _, ...user } = userRow;
    res.json({ token, user });
  });
};
