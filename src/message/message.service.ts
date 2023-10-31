import { Injectable } from '@nestjs/common';
import { MOCK_MESSAGES } from './mock-message';
import { MessageModel } from '@core/model/mesage/message.model';
import { randomUUID } from 'crypto';
import { UserModel } from '@core/model/user/user.model';
import { generateSecret } from '@common/stringUtils';


@Injectable()
export class MessageService {

    private messageList: MessageModel[] = MOCK_MESSAGES;

    public add(message: Omit<MessageModel, "id">) {
        const id: string = generateSecret();
        this.messageList.push({ id, ...message });
    }

    public getAll(): MessageModel[] {
        return [...this.messageList];
    }

}
