import { Injectable } from '@nestjs/common';
import { MOCK_MESSAGES } from './mock-message';
import { MessageModel } from '@core/model/mesage/message.model';
import { randomUUID } from 'crypto';
import { UserModel } from '@core/model/user/user.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MessageService {

    private messageList: MessageModel[] = MOCK_MESSAGES;

    public add(message: Omit<MessageModel, "id">) {
        const id: string = uuidv4();
        this.messageList.push({ id, ...message });
    }

    public getAll(): MessageModel[] {
        return [...this.messageList];
    }

}
