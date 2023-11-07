import { type UserModel } from "../user/user.model";

export interface MessageModel {
  author: UserModel;
  content: string;
  date: Date;
  id: string;
}
