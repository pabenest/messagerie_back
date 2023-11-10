import z from "zod";

export const updateUserDtoSchema = z.object({
  pseudo: z.string(),
  secret: z.string(),
});

export type UpdateUserDto = z.infer<typeof updateUserDtoSchema>;
