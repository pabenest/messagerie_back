import { type UserModel } from "@core/model/user/user.model";
import { type CanActivate, createParamDecorator, type ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { type Request } from "express";
import { type Observable } from "rxjs";
import { UserService } from "src/user/user.service";

export const UserControl = Reflector.createDecorator<UserControlType>();

interface RequestWithUser extends Request {
  body: {
    secret?: string;
  };
  user: UserModel;
}

export enum UserControlType {
  ID = "ID",
  ID_AND_SECRET = "ID_AND_SECRET",
}

@Injectable()
export class UserAuthGuard implements CanActivate {
  static authUser = createParamDecorator((_: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    return user;
  });

  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  canActivate(context: ExecutionContext): Observable<boolean> | Promise<boolean> | boolean {
    const userControl = this.reflector.get(UserControl, context.getHandler());
    if (!userControl) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const params = request.params;
    const userId = params.id;

    let user: UserModel | null;
    switch (userControl) {
      case UserControlType.ID: {
        user = this.userService.findOneById(userId);
        break;
      }
      case UserControlType.ID_AND_SECRET: {
        const secret = request.body.secret;
        if (!secret) return false;
        user = this.userService.findOneByIdAndSecret(userId, secret);
        break;
      }

      default: {
        console.log(
          "Le décorateur 'UserControls' ne peut avoir pour paramètre qu'une entrée de type string de l'énumérateur 'UserControlType'",
        );
        return false;
      }
    }
    if (user !== null) {
      request.user = user;
      return true;
    }

    return false;
  }
}
