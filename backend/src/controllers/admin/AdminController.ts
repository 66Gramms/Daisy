import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createContextLogger } from "../../logger";
import { GetUserByUsername } from "../../services/admin/AdminService";
import { LoginRequest, LoginResponse } from "../../dtos";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";
const logger = createContextLogger("AdminController");

export const Login = async (req: Request, res: Response) => {
  const { username, password } = req.body as LoginRequest;

  try {
    const userRow = await GetUserByUsername(username);
    if (!userRow) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
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
    const response: LoginResponse = {
      token,
      username: userRow.username,
      accessRights: userRow.accessRights,
    };
    res.json(response);
  } catch (err: any) {
    logger.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
