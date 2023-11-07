import { generateSecret } from "@common/stringUtils";
import { type MessageModel } from "@core/model/mesage/message.model";
import { Injectable } from "@nestjs/common";

import { MOCK_MESSAGES } from "./mock-message";

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
