import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserService } from "src/user/user.service";

export const UserControl = Reflector.createDecorator<string[]>();

export enum UserControlType { ID = "ID", ID_AND_SECRET = "ID_AND_SECRET" }

@Injectable()
export class UserAuthGuard implements CanActivate {

    constructor(private reflector: Reflector, private readonly userService: UserService) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        const userControls = this.reflector.get(UserControl, context.getHandler());
        if (!userControls) {
            return true;
        } else if (userControls.length > 1) {
            console.log("Le décorateur 'UserControls' ne peut avoir qu'un seul paramètre.")
            return false;
        }

        const request = context.switchToHttp().getRequest();
        const params = request.params;
        const userId = params.id;
        const secretBody = request.body.secret;

        switch (userControls[0]) {
            case UserControlType.ID: {
                const user = this.userService.findOneById(userId);
                const success = user != null;
                console.log("UserAuthGuard[ID]:", success, " id:", userId);
                return success;
            }
            case UserControlType.ID_AND_SECRET: {
                const user = this.userService.findOneByIdAndSecret(userId, secretBody);
                const success = user != null;
                console.log("UserAuthGuard[ID_AND_SECRET]:", success, " id:", userId, " secret:", secretBody);
                return success;
            }

            default: {
                console.log("Le décorateur 'UserControls' ne peut avoir pour paramètre qu'une entrée de type string de l'énumérateur 'UserControlType'")
                return false;
                break;
            }
        }


        return true;
    }
}
