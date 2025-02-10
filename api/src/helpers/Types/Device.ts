
import { z } from 'zod';

// Esquema para Device
export const DeviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  ip: z.string(),
  users: z.string(),
  UsersDevices: z.array(z.string()),
  GroupsDevices: z.array(z.any()), // Atualizaremos isso depois
  password: z.string(),
  status: z.boolean(),
});

// Inferindo o tipo Device a partir do esquema ZOD
export type Device = z.infer<typeof DeviceSchema>;


export const DeviceBasicInfoSchema = DeviceSchema.pick({
  id: true,
  name: true,
  status: true,
});

// Inferindo o tipo DeviceBasicInfo
export type DeviceBasicInfo = z.infer<typeof DeviceBasicInfoSchema>;