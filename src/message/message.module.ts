import { forwardRef, Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";

import { MessageController } from "./message.controller";
import { MessageService } from "./message.service";

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
