import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { MessageModule } from "./message/message.module";
import { UserController } from "./user/user.controller";
import { UserModule } from "./user/user.module";
import { UserService } from "./user/user.service";

@Module({
  imports: [MessageModule, UserModule, ScheduleModule.forRoot()],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
