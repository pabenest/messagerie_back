import z from "zod";

export const createMessageDtoSchema = z.object({
  content: z.string(),
  author: z.string(),
  date: z.date(),
  id: z.string(),
});

export type MessageDto = z.infer<typeof createMessageDtoSchema>;
