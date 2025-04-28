
import { z } from 'zod';

// Esquema para Device
export const DeviceSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  ip: z.string().ip(),
  user: z.string(),
  password: z.string(),
  status: z.boolean(),
  
  usersDevices: z.array(z.any()).optional(),
  groupsDevices: z.array(z.any()).optional(),
  timeZonesDevices: z.array(z.any()).optional(),
  timeSpansDevices: z.array(z.any()).optional(),
  accessRules: z.array(z.any()).optional(),
  usersGroups: z.array(z.any()).optional(),
})

// Inferindo o tipo Device a partir do esquema ZOD
export type Device = z.infer<typeof DeviceSchema>;


export const DeviceBasicInfoSchema = DeviceSchema.pick({
  id: true,
  name: true,
  status: true,
});

// Inferindo o tipo DeviceBasicInfo
export type DeviceBasicInfo = z.infer<typeof DeviceBasicInfoSchema>;