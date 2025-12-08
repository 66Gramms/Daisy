import sqlite3 from "sqlite3";
import { AccessRights } from "../../consts";

const db = new sqlite3.Database("./database.sqlite");

const REGISTER_USER =
  "INSERT INTO users (username, password, accessRights) VALUES (?, ?, ?)";
export function CreateUser(
  username: string,
  hashedPassword: string,
  accessRights: AccessRights
): Promise<number> {
  return new Promise((resolve, reject) => {
    db.run(
      REGISTER_USER,
      [username, hashedPassword, accessRights],
      function (err) {
        if (err) return reject(err);
        resolve(this.lastID);
      }
    );
  });
}

const GET_USER_BY_NAME =
  "SELECT id, username, password, accessRights FROM users WHERE LOWER(username) = ?";
export function GetUserByUsername(username: string): Promise<{
  id: number;
  username: string;
  password: string;
  accessRights: AccessRights;
} | null> {
  return new Promise((resolve, reject) => {
    db.get(GET_USER_BY_NAME, [username.toLowerCase()], (err, row) => {
      if (err) return reject(err);
      if (!row) return resolve(null);
      resolve(
        row as {
          id: number;
          username: string;
          password: string;
          accessRights: AccessRights;
        }
      );
    });
  });
}
