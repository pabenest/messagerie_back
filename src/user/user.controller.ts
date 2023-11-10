import { UserAuthGuard, UserControl, UserControlType } from "@common/guard/userGuard";
import { generatePseudo, generateSecret } from "@common/stringUtils";
import { CreateMessageDto, createMessageDtoSchema } from "@core/dto/message/CreateMessageDto";
import { PingUserDto } from "@core/dto/user/PingUserDto";
import { UpdateUserDto } from "@core/dto/user/UpdateUserDto";
import { UserModel } from "@core/model/user/user.model";
import { ZodValidationPipe } from "@core/pipes/ZodValidationPipe";
import { Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { MessageService } from "src/message/message.service";

import { UserService } from "./user.service";

@Controller("user")
@UseGuards(UserAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService,
  ) {}

  private logout(author: UserModel) {
    if (!author.sendLogOut) {
      const content = `${author.pseudo} vient de se deconnecter `;
      this.messageService.add({ author, content, date: new Date() });
    }
    this.userService.deconnecte(author);
  }

  @Cron("*/1 * * * *")
  handleCron() {
    for (const user of this.userService.getAll()) {
      const currentDate = new Date();
      currentDate.setMinutes(currentDate.getMinutes() - 1);

      if (user.lastPing < currentDate) {
        this.logout(user);
      }
    }
  }

  // //GET / users(pour récupérer la liste des utilisateurs connectés)
  // @Get()
  // getConnectedUsers() {
  //     console.log("getConnectedUsers");
  //     return this.userService.getConnectedUsers()
  // }

  @Get()
  getAllUser() {
    return this.userService.getAll();
  }

  //GET / users(pour récupérer la liste des utilisateurs connectés)
  @Post("login")
  login(@Body() secret: string) {
    let author = this.userService.findOneBySecret(secret);
    if (!author) {
      const secretNew = generateSecret();
      this.userService.add({ pseudo: generatePseudo(), secret: secretNew });
      author = this.userService.findOneBySecret(secretNew)!;
    }

    this.userService.login(author);
    const content = `${author.pseudo} vient de se connecter`;
    this.messageService.add({ author, content, date: new Date() });

    return author;
  }

  //PUT / users /: uuid(pour modifier le pseudo d’un utilisateur)
  @Put(":id/")
  @UserControl(UserControlType.ID_AND_SECRET)
  update(@Param("id") id: string, @Body() user: UpdateUserDto, @UserAuthGuard.authUser() author: UserModel) {
    const pseudoOld = author.pseudo;

    console.log("changement de pseudo");
    author = this.userService.update(id, { pseudo: user.pseudo, secret: user.secret });
    const content = `${pseudoOld} a maintenant pour pseudo : ${author.pseudo}`;
    this.messageService.add({ author, content, date: new Date() });
    return { id, pseudo: author.pseudo };
  }

  @Put(":id/logout")
  @UserControl(UserControlType.ID)
  deconnecte(@UserAuthGuard.authUser() author: UserModel) {
    this.logout(author);
  }

  //POST / users /: uuid / ping(pour indiquer au serveur qu’un utilisateur est toujours connecté
  @Post(":id/ping")
  @UserControl(UserControlType.ID_AND_SECRET)
  ping(@Param("id") id: string, @Body() ping: PingUserDto, @UserAuthGuard.authUser() user: UserModel) {
    console.log("je passe par là.");
    this.userService.ping(user);
  }

  //POST / messages(pour envoyer un message) /users/:uuid/messages
  @Post(":id/messages")
  @UserControl(UserControlType.ID_AND_SECRET)
  @UsePipes(new ZodValidationPipe(createMessageDtoSchema))
  addMessage(@Body() message: CreateMessageDto, @UserAuthGuard.authUser() author: UserModel) {
    this.messageService.add({
      author,
      content: message.content,
      date: new Date(),
    });
  }
}
