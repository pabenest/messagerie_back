import { UserDto } from "./UserDto";


export type createUserDto = Omit<UserDto, "id">;


