import { Module } from '@nestjs/common';
import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { MessageService } from './message/message.service';
import { MessageController } from './message/message.controller';
import { UserController } from './user/user.controller';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [MessageModule, UserModule, ScheduleModule.forRoot()],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule { }
