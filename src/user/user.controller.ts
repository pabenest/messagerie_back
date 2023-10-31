import { createUserDto } from '@core/dto/user/CreateUserDto';
import { Body, Controller, Get, Inject, Param, Post, Put, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from '@core/model/user/user.model';
import { MOCK_USER } from './mock-user'
import { UpdateUserDto } from '@core/dto/user/UpdateUserDto';
import { PingUserDto } from '@core/dto/user/PingUserDto';
import { MessageService } from 'src/message/message.service';
import { Cron } from '@nestjs/schedule';
import { generatePseudo, generateSecret } from '@common/stringUtils';
import { CreateMessageDto } from '@core/dto/message/CreateMessageDto';
import { identity } from 'rxjs';
import { UnexpectedServiceError } from '@common/error';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly messageService: MessageService) { }


    //POST /users (pour créer un utilisateur et récupérer son uuid)    
    @Post()
    addUser(@Body() user: createUserDto): string {

        //On recherche le user par le pseudo s'il existe on retourne son UUID
        //sinon on réalise la création puis on retourne son UUID
        console.log("add user:", user);
        return this.userService.add({
            pseudo: user.pseudo, secret: null
        });
    }

    // //GET / users(pour récupérer la liste des utilisateurs connectés)
    // @Get()
    // getConnectedUsers() {
    //     console.log("getConnectedUsers");
    //     return this.userService.getConnectedUsers()
    // }

    @Get()
    getAllUser() {
        return this.userService.getAll()
    }

    //GET / users(pour récupérer la liste des utilisateurs connectés)
    @Post("login")
    login(@Body() secret: string) {


        let author = this.userService.findOneBySecret(secret)
        if (!author) {
            const secretNew = generateSecret();
            this.userService.add({ pseudo: generatePseudo(), secret: secretNew })
            author = this.userService.findOneBySecret(secretNew)
        }

        this.userService.login(author)
        const content = `${author.pseudo} vient de se connecter`
        this.messageService.add({ author, content, date: new Date() })

        return author;
    }

    //PUT / users /: uuid(pour modifier le pseudo d’un utilisateur)
    @Put(":id/")
    update(@Param("id") id: string, @Body() user: UpdateUserDto) {

        let author = this.userService.findOneByIdAndSecret(id, user.secret)
        const pseudoOld = author.pseudo
        if (author) {
            console.log("changement de pseudo")
            author = this.userService.update(
                id, { pseudo: user.pseudo, secret: user.secret }
            )
            const content = `${pseudoOld} a maintenant pour pseudo : ${author.pseudo}`
            this.messageService.add({ author, content, date: new Date() })
            return { id, pseudo: author.pseudo }
        }
        return null;
    }

    @Put(":id/logout")
    deconnecte(@Param("id") id: string) {
        console.log(new Date(), 'deconnecte:', id)

        const author = this.userService.findOneById(id)
        if (author) {
            if (!author.sendLogOut) {
                const content = `${author.pseudo} vient de se deconnecter `
                this.messageService.add({ author, content, date: new Date() })
            }
            this.userService.deconnecte(author)
        }
    }

    //POST / users /: uuid / ping(pour indiquer au serveur qu’un utilisateur est toujours connecté
    @Post(":id/ping")
    ping(@Param("id") id: string, @Body() ping: PingUserDto) {

        const user = this.userService.findOneByIdAndSecret(id, ping.secret)
        if (user) {
            this.userService.ping(user)
        }
    }
    @Cron("*/1 * * * *")
    handleCron() {
        for (const user of this.userService.getAll()) {

            const currentDate = new Date()
            currentDate.setMinutes(currentDate.getMinutes() - 1);

            if (user.lastPing < currentDate) {
                this.deconnecte(user.id)
            }
        }
    }



    //POST / messages(pour envoyer un message) /users/:uuid/messages
    @Post(":id/messages")
    addMessage(@Param('id') id, @Body() message: CreateMessageDto): void {

        console.log("add Back message", message);

        //Recuération du UserModel grace au Secret...
        const user: UserModel = this.userService.findOneByIdAndSecret(id, message.secret);

        if (user) {
            this.messageService.add({
                author: user,
                content: message.content,
                date: new Date()
            });

        } else {
            throw new UnexpectedServiceError("L'utilisateur n'a pas été trouvé.")
        }
    }
}
