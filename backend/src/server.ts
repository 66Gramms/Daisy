import express from "express";
import sqlite3 from "sqlite3";
import fs from "fs";
import bodyParser from "body-parser";
import { logger } from "./logger";
import adminRouter from "./routes/admin";
import cors from "cors";
import { requestLogger } from "./middleware/requestLogger";

const PORT = process.env.PORT || 5000;

const db = new sqlite3.Database("./database.sqlite", (err: Error | null) => {
  if (err) {
    logger.error("Error opening database:", err.message);
    process.exit(1);
  } else {
    const initSql = fs.readFileSync("./database.sqlite.init.sql", "utf8");
    db.exec(initSql, (err: Error | null) => {
      if (err) {
        logger.error("Error, couldn't initialize SQL:", err.message);
      } else {
        logger.info("Database initialized");
      }
    });
  }
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(requestLogger);
app.use("/api/admin", adminRouter);

app
  .listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
  })
  .setTimeout(10000);
