import z from "zod";

export const withIdSchema = z.object({
  id: z.string().uuid(),
});

export type WithId = z.infer<typeof withIdSchema>;
