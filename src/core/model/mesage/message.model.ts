import { WithId } from "@common/model/WithId";

export interface MessageModel {
    id: string;
    author: string;
    content: string;
    date: Date;
}