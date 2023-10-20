import { MessageDto } from "@core/dto/message/MessageDto";
import { MessageModel } from "@core/model/mesage/message.model";


export const MOCK_MESSAGES: MessageModel[] = [
  {
    author: "4ec0bd4f-44c0-43da-975e-2a8ad9ebae0b",
    content: "Salut je suis en train de saisir mon premier message aussi",
    date: new Date('December 17, 1995 03:24:00'),
    id: "5ec0bd8f-11c0-43da-975e-2a1ad9ebae0b",
  },
  {
    id: "6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b",
    author: "4ec0bd8f-12c0-41da-975e-2a1ad9ebae0b",
    content: "Salut je suis en train de saisir mon premier message",
    date: new Date('November 17, 1995 03:24:00'),
  },
  {
    id: "4ec0bd4f-44c0-43da-975e-2a8ad9ebae0b",
    author: "6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b",
    content: "Salut à tous",
    date: new Date('October 17, 1995 03:24:00'),
  },
];
