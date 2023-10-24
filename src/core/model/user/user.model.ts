import { WithId } from "@common/model/WithId";

export interface UserModel {
    id: string //UUID
    pseudo: string;
    secret: string;
    lastPing: Date;
    sendLogOut: boolean
}