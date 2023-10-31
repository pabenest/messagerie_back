import { UserModel } from '@core/model/user/user.model';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { MOCK_USER } from './mock-user';
import { UnexpectedError, UnexpectedServiceError } from '@common/error';
import { v4 as uuidv4 } from 'uuid';
import { Cron, CronExpression } from '@nestjs/schedule';
import { generateSecret } from '@common/stringUtils';

@Injectable()
export class UserService {
    private userList: UserModel[] = MOCK_USER;

    public findOneByIdAndSecret(id: string, secret: string): UserModel | null {
        if (id && secret) {
            if (secret !== null) {
                const all = this.getAll();
                for (const user of all) {
                    if (user.id === id && user.secret === secret) {
                        return user;
                    }
                }
            }
        }
        return null;
    }

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

        if (secret !== null) {
            const all = this.getAll()

            for (const user of all) {
                if (secret === user.secret) {
                    return user;
                }
            }
        }
        return null;

    }

    public add(user: Omit<UserModel, "id" | "lastPing" | "sendLogOut">): string {

        const userExist = this.findOneByPseudo(user.pseudo);

        if (userExist) {
            return userExist.id
        } else {
            const id: string = generateSecret();
            const lastPing = new Date()
            this.userList.push({ id, lastPing, sendLogOut: false, ...user });
            return id
        }
    }

    public update(id: string, user: Omit<UserModel, "id" | "lastPing" | "sendLogOut">) {

        const userDatabase = this.findOneByIdAndSecret(id, user.secret)

        if (userDatabase) {
            userDatabase.pseudo = user.pseudo
            userDatabase.lastPing = new Date()
        } else {
            throw new UnexpectedServiceError("L'utilisateur n'existe pas")
        }
        return userDatabase;
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

    public deconnecte(user: UserModel) {

        if (user) {
            user.sendLogOut = true
        } else {
            throw new UnexpectedServiceError("Le paramètre user est null.")
        }
    }

    public login(user: UserModel) {
        this.ping(user)
    }

    public ping(user: UserModel) {

        if (user) {
            user.lastPing = new Date()
            user.sendLogOut = false
        } else {
            throw new UnexpectedServiceError("Le paramètre user est null.")
        }
    }

    public getAll(): UserModel[] {
        return [...this.userList];
    }



}
