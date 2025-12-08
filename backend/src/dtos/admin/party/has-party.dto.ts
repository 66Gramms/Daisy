import { z } from "zod";

export const GetPartyResponseSchema = z.object({
  name: z.string(),
});

export type GetPartyResponse = z.infer<typeof GetPartyResponseSchema>;
