export interface UserModel {
  id: string;
  lastPing: Date;
  pseudo: string;
  secret: string;
  sendLogOut: boolean;
}
