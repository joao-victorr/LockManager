import { z } from 'zod';

export const CreateAccessRulesSchema = z.object({
  groupId: z.number().int(),
  access: z.array(z.object({
    deviceId: z.string().cuid(),
    timeZonesId: z.number().int()
  }))
})