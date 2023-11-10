import z from "zod";

export const createUserDtoSchema = z.object({
  pseudo: z.string(),
});

export type CreateUserDto = z.infer<typeof createUserDtoSchema>;
