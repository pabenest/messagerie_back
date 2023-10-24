import { createUserDto } from '@core/dto/user/CreateUserDto';
import { Body, Controller, Get, Inject, Param, Post, Put, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from '@core/model/user/user.model';
import { MOCK_USER } from './mock-user'
import { UpdateUserDto } from '@core/dto/user/UpdateUserDto';
import { PingUserDto } from '@core/dto/user/PingUserDto';
import { MessageService } from 'src/message/message.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly messageService: MessageService) { }


    //POST /users (pour créer un utilisateur et récupérer son uuid)    
    @Post()
    add(@Body() user: createUserDto): string {

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
    @Get(":pseudo")
    connecte(@Param("pseudo") pseudo: string) {
        const author = this.userService.findOneByPseudo(pseudo)
        if (author) {
            this.userService.connecte(author.id)
            const content = `${author.pseudo} vient de se connecter`
            this.messageService.add({ author, content, date: new Date() })
        }

        return author;
    }

    //PUT / users /: uuid(pour modifier le pseudo d’un utilisateur)
    @Put()
    update(@Body() user: UpdateUserDto) {

        this.userService.update(
            user.id, { pseudo: user.pseudo, secret: user.secret }
        )
    }

    @Put(":id/logout")
    deconnecte(@Param("id") id: string) {
        console.log(new Date(), 'deconnecte:', id)

        const author = this.userService.findOneById(id)
        if (author) {
            if (!author.sendLogOut) {
                const content = `${author.pseudo} vient de se deconnecter `
                this.messageService.add({ author, content, date: new Date() })
                this.userService.deconnecte(id)
            }
            this.userService.deconnecte(id)
        }
    }

    //POST / users /: uuid / ping(pour indiquer au serveur qu’un utilisateur est toujours connecté
    @Post(":id")
    ping(@Param("id") id: string, ping: PingUserDto) {

        this.userService.ping(id)
    }
}
