import { forwardRef, Module } from "@nestjs/common";
import { MessageModule } from "src/message/message.module";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [forwardRef(() => MessageModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
