import z from "zod";

export const createMessageDtoSchema = z.object({
  content: z.string(),
  secret: z.string(),
});

export type CreateMessageDto = z.infer<typeof createMessageDtoSchema>;
