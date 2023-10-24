import { Body, Controller, Get, Inject, NotFoundException, Param, ParseIntPipe, Post, Put, forwardRef } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from '@core/dto/message/CreateMessageDto';
import { UserModel } from '@core/model/user/user.model';
import { UserService } from 'src/user/user.service';
import { UnexpectedServiceError } from '@common/error';
import { MessageDto } from '@core/dto/message/MessageDto';

@Controller('message')
export class MessageController {


    constructor(
        private readonly messageService: MessageService,
        private readonly userService: UserService) { }

    //POST / messages(pour envoyer un message)
    @Post()
    add(@Body() message: CreateMessageDto): void {

        console.log("add Back message", message);

        //Recuération du UserModel grace au Secret...
        const user: UserModel = this.userService.findOneById(message.secret);

        if (user) {
            this.messageService.add({
                author: user,
                content: message.content,
                date: new Date()
            });

        } else {
            throw new UnexpectedServiceError("L'uttilisateur n'a pas été trouvé")
        }
    }

    //GET /messages (pour récupérer les N derniers messages)
    @Get()
    getAll(): MessageDto[] {

        const messagesModel = this.messageService.getAll()
        messagesModel.sort((a, b) => b.date.getTime() - a.date.getTime());

        let messages: MessageDto[] = []
        for (let i = 0; i < 5; i++) {
            if (i < messagesModel.length) {
                const message = messagesModel[i]
                messages.push({ author: message.author.id, content: message.content, date: message.date, id: message.id })
            } else {
                break;
            }
        }

        return messages;
    }

}
