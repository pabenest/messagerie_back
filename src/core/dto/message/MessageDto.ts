import { withIdSchema } from "@common/model/WithId";
import z from "zod";

import { createMessageDtoSchema } from "./CreateMessageDto";

export const messageDtoSchema = createMessageDtoSchema.extend(withIdSchema.shape).extend({
  date: z.date(),
});

export type MessageDto = z.infer<typeof messageDtoSchema>;
