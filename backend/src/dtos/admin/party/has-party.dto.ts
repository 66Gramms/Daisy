import { z } from "zod";

export const HasPartyResponseSchema = z.object({
  hasParty: z.boolean(),
});

export type HasPartyResponse = z.infer<typeof HasPartyResponseSchema>;
