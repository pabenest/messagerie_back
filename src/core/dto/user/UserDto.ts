import z from "zod";

export const userDtoSchema = z.object({
  id: z.string(),
  pseudo: z.string(),
});
export type UserDto = z.infer<typeof userDtoSchema>;
