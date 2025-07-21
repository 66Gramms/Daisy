import sqlite3 from "sqlite3";
import { AccessRights } from "../../../consts";
import { CreateParty } from "../../../services/admin/party/PartyService";
import {
  CreateUser,
  GetPartyCount,
} from "../../../services/admin/AdminService";
import { createContextLogger } from "../../../logger";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";
const db = new sqlite3.Database("./database.sqlite");
const logger = createContextLogger("PartyController");

export const RegisterParty = async (req: Request, res: Response) => {
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

  try {
    const count = await GetPartyCount();
    if (count > 0) {
      return res.status(403).json({
        error:
          "Party already exists. This endpoint should only be called once.",
      });
    }
  } catch (err: any) {
    logger.error("Error getting party count:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }

  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  try {
    db.run("BEGIN TRANSACTION");
    const userId = await CreateUser(
      username,
      hashedPassword,
      AccessRights.superAdmin
    );
    await CreateParty(partyname);
    const token = jwt.sign(
      { userId, accesRights: AccessRights.superAdmin },
      SECRET_KEY,
      { expiresIn: "7d" }
    );
    res.status(201).json({
      token,
      username,
      partyname,
    });
  } catch (err: any) {
    logger.error("Error registering user or party:", err.message);
    db.run("ROLLBACK");
    return res.status(500).json({ error: "Internal server error" });
  }
  logger.debug("User registered:", username);
  logger.debug("Party registered:", partyname);
  db.run("COMMIT");
};
