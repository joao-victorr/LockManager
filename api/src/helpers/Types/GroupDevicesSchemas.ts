import { z } from 'zod';


export const CreateGroupSchema = z.object({
  groupId: z.number(),
  devicesId: z.array(z.string().cuid())
})

export const SearchGroupDeviceSchema = z.object({
  groupId: z.coerce.number().optional(),
  deviceId: z.string().optional()
});

