import z from "zod";

export const createMessageDto = z.object({
  content: z.string(),
  secret: z.string(),
});

export type CreateMessageDto = z.infer<typeof createMessageDto>;
