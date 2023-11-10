import z from "zod"; 
import { type UserDto } from "./UserDto";

export const createUserDtoSchema = z.object({
  pseudo: z.string(),
});

export type CreateUserDto = Omit<UserDto, "id">;
