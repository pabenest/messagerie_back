import { type MessageDto } from "@core/dto/message/MessageDto";
import { Controller, Get } from "@nestjs/common";
import { UserService } from "src/user/user.service";

import { MessageService } from "./message.service";

@Controller("message")
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
  ) {}

  //GET /messages (pour récupérer les N derniers messages)
  @Get()
  getAll(): MessageDto[] {
    const messagesModel = this.messageService.getAll();
    messagesModel.sort((a, b) => b.date.getTime() - a.date.getTime());

    const messages: MessageDto[] = [];
    for (let i = 0; i < 5; i++) {
      if (i < messagesModel.length) {
        const message = messagesModel[i];
        messages.push({ author: message.author.id, content: message.content, date: message.date, id: message.id });
      } else {
        break;
      }
    }

    return messages;
  }
}
