import { UserModel } from '@core/model/user/user.model';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { MOCK_USER } from './mock-user';
import { UnexpectedError, UnexpectedServiceError } from '@common/error';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
    private userList: UserModel[] = MOCK_USER;

    public findOneById(id: string): UserModel {
        for (const user of this.userList) {
            if (user.id === id) {
                return user;
            }
        }
        return null;
    }

    public findOneByPseudo(pseudo: string) {
        for (const user of this.userList) {
            if (user.pseudo === pseudo) {
                return user;
            }
        }
        return null;
    }

    public findOneBySecret(secret: string): UserModel | null {

        const all = this.getAll()

        for (const user of all) {
            if (secret === user.secret) {
                return user;
            }
        }
        return null;

    }

    public add(user: Omit<UserModel, "id" | "lastPing">): string {

        const userExist = this.findOneByPseudo(user.pseudo);

        if (userExist) {
            return userExist.id
        } else {
            const id: string = uuidv4();
            const lastPing = new Date()
            this.userList.push({ id, lastPing, ...user });
            return id
        }
    }



    public update(id: string, user: Omit<UserModel, "id" | "lastPing">) {

        const userDatabase = this.findOneById(id)

        if (userDatabase) {
            userDatabase.pseudo = user.pseudo
            userDatabase.lastPing = new Date()
        } else {
            throw new UnexpectedServiceError("L'utilisateur n'existe pas")
        }
    }

    public getConnectedUsers() {

        let connected = []

        const currentDate = new Date()
        currentDate.setMinutes(currentDate.getMinutes() - 1);

        let all = this.getAll()

        for (let user of all) {
            if (user.lastPing >= currentDate) {
                connected.push(user)
            }
        }
        return connected;
    }

    public ping(secret: string) {
        const user: UserModel = this.findOneBySecret(secret);

        if (user) {
            user.lastPing = new Date()
        } else {
            throw new UnexpectedServiceError("L'utilisateur n'existe pas")
        }
    }

    private getAll(): UserModel[] {
        return [...this.userList];
    }

}
