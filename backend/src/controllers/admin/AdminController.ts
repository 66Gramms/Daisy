import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createContextLogger } from "../../logger";
import { GetUserByUsername } from "../../services/admin/AdminService";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";
const logger = createContextLogger("AdminController");

export const Login = async (req: Request, res: Response) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

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
    res.json({
      token,
      username: userRow.username,
      accessRights: userRow.accessRights,
    });
  } catch (err: any) {
    logger.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
