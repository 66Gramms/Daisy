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
  let userId: number | undefined;

  db.run("BEGIN TRANSACTION");
  try {
    userId = await CreateUser(
      username,
      hashedPassword,
      AccessRights.superAdmin
    );
  } catch (err: any) {
    logger.error("Error registering user:", err.message);
    db.run("ROLLBACK");
    return res.status(500).json({ error: "Internal server error" });
  }
  try {
    await CreateParty(partyname);
  } catch (err: any) {
    logger.error("Error creating party:", err.message);
    db.run("ROLLBACK");
    return res.status(500).json({ error: "Internal server error" });
  }
  const token = jwt.sign(
    { userId, accesRights: AccessRights.superAdmin },
    SECRET_KEY,
    { expiresIn: "7d" }
  );
  logger.debug("User registered:", username);
  logger.debug("Party registered:", partyname);
  db.run("COMMIT");
  return res.status(201).json({
    token,
    username,
    accessRights: AccessRights.superAdmin,
  });
};

export const HasParty = async (req: Request, res: Response) => {
  try {
    const count = await GetPartyCount();
    return res.status(200).json({ hasParty: count > 0 });
  } catch (err: any) {
    logger.error("Error checking party existence:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
