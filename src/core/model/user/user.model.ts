export interface UserModel {
    id: string
    pseudo: string;
    secret: string;
    lastPing: Date;
    sendLogOut: boolean
}