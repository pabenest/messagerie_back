import { withIdSchema } from "@common/model/WithId";
import type z from "zod";

import { createUserDtoSchema } from "./CreateUserDto";

export const userDtoSchema = createUserDtoSchema.extend(withIdSchema.shape);

export type UserDto = z.infer<typeof userDtoSchema>;
