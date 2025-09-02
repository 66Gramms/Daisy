import { z } from "zod";

export const PartyRegisterSchema = z
  .object({
    partyname: z
      .string()
      .min(2, { message: "Party name must be at least 2 characters long" })
      .max(100, { message: "Party name must be at most 100 characters long" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(100, { message: "Username must be at most 100 characters long" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(100, { message: "Password must be at most 100 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type PartyRegisterFormData = z.infer<typeof PartyRegisterSchema>;

export const AdminLoginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(100, { message: "Username must be at most 100 characters long" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be at most 100 characters long" }),
});

export type AdminLoginFormData = z.infer<typeof AdminLoginSchema>;
