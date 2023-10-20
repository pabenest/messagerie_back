import { MessageDto } from "@core/dto/message/MessageDto";
import { MessageModel } from "@core/model/mesage/message.model";
import { UserModel } from "@core/model/user/user.model";


export const MOCK_USER: UserModel[] = [
  {
    pseudo: "Pierre",
    secret: "bonjour",
    id: "4ec0bd8f-12c0-41da-975e-2a1ad9ebae0b",
    lastPing: new Date('July 31, 2022 11:30:25')
  },
  {
    id: "6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b",
    pseudo: "Lilian",
    secret: "salut",
    lastPing: new Date('July 31, 2022 11:30:25')
  },
  {
    id: "4ec0bd4f-44c0-43da-975e-2a8ad9ebae0b",
    pseudo: "Mathieu",
    secret: "au revoir",
    lastPing: new Date('July 31, 2022 11:30:25')
  },
];
