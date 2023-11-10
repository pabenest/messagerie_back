import z from "zod";

export const pingUserDtoSchema = z.object({
  secret: z.string(),
});

export type PingUserDto = z.infer<typeof pingUserDtoSchema>;
