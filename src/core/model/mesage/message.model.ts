import { WithId } from "@common/model/WithId";
import { UserModel } from "../user/user.model";

export interface MessageModel {
    id: string;
    author: UserModel;
    content: string;
    date: Date;
}