import { z } from "zod";

export const RegisterPartyRequestSchema = z
  .object({
    partyname: z
      .string()
      .min(1, "Party name is required")
      .max(100, "Party name must be at most 100 characters"),
    username: z
      .string()
      .min(1, "Username is required")
      .max(50, "Username must be at most 50 characters"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const RegisterPartyResponseSchema = z.object({
  token: z.string(),
  username: z.string(),
  accessRights: z.number(),
});

export type RegisterPartyRequest = z.infer<typeof RegisterPartyRequestSchema>;
export type RegisterPartyResponse = z.infer<typeof RegisterPartyResponseSchema>;
