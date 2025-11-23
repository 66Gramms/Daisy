import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { createContextLogger } from "../logger";

const logger = createContextLogger("ValidationMiddleware");

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.issues.map((issue: z.ZodIssue) => ({
          path: issue.path.join("."),
          message: issue.message,
        }));
        logger.warn("Validation error:", errorMessages);
        return res.status(400).json({
          error: "Validation failed",
          details: errorMessages,
        });
      }
      logger.error("Unexpected validation error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};
