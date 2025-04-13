import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  isActive: z.boolean(), // Adicionado o campo isActive com tipo booleano
  _count: z.object({
    usersGroups: z.number(),
    usersDevices: z.number()
  }),
  beginTime: z.nullable(z.string()),
  endTime: z.nullable(z.string()),
});