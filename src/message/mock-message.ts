import { type MessageModel } from "@core/model/mesage/message.model";

export const MOCK_MESSAGES: MessageModel[] = [
  {
    author: {
      pseudo: "Pierre",
      secret: "bonjour",
      id: "4ec0bd8f-12c0-41da-975e-2a1ad9ebae0b",
      lastPing: new Date("July 31, 2022 11:30:25"),
      sendLogOut: false,
    },
    content: "Salut je suis en train de saisir mon premier message aussi",
    date: new Date("December 17, 1995 03:24:00"),
    id: "5ec0bd8f-11c0-43da-975e-2a1ad9ebae0b",
  },
  {
    id: "6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b",
    author: {
      id: "6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b",
      pseudo: "Lilian",
      secret: "salut",
      lastPing: new Date("July 31, 2022 11:30:25"),
      sendLogOut: false,
    },
    content: "Salut je suis en train de saisir mon premier message",
    date: new Date("November 17, 1995 03:24:00"),
  },
  {
    id: "4ec0bd4f-44c0-43da-975e-2a8ad9ebae0b",
    author: {
      id: "4ec0bd4f-44c0-43da-975e-2a8ad9ebae0b",
      pseudo: "Mathieu",
      secret: "au revoir",
      lastPing: new Date("July 31, 2022 11:30:25"),
      sendLogOut: false,
    },
    content: "Salut à tous",
    date: new Date("October 17, 1995 03:24:00"),
  },
];
