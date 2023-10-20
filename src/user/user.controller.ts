import { createUserDto } from '@core/dto/user/CreateUserDto';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from '@core/model/user/user.model';
import { MOCK_USER } from './mock-user'
import { UpdateUserDto } from '@core/dto/user/UpdateUserDto';
import { PingUserDto } from '@core/dto/user/PingUserDto';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService) { }


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

    //GET / users(pour récupérer la liste des utilisateurs connectés)
    @Get()
    getConnectedUsers() {
        console.log("getConnectedUsers");
        return this.userService.getConnectedUsers()
    }

    //GET / users(pour récupérer la liste des utilisateurs connectés)
    @Get(":pseudo")
    getUser(@Param("pseudo") pseudo: string) {
        console.log("getUser");
        return this.userService.findOneByPseudo(pseudo);
    }

    //PUT / users /: uuid(pour modifier le pseudo d’un utilisateur)
    @Put()
    update(@Body() user: UpdateUserDto) {
        console.log("update user:", user);

        this.userService.update(
            user.id, { pseudo: user.pseudo, secret: user.secret }
        )
    }

    //POST / users /: uuid / ping(pour indiquer au serveur qu’un utilisateur est toujours connecté
    @Post(":id")
    ping(@Param("id") id: string, ping: PingUserDto) {
        console.log("ping user:", ping);
        this.userService.ping(ping.secret)
    }
}
