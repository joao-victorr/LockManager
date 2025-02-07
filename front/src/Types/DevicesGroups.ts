// import type { Device } from "./Device"
// import type { Group } from "./Groups";

// export type DevicesGroup = {
//   id: string;
//   code: number;
//   id_locks: string;
//   id_groups: string;
//   groups: Group;
//   locks: Device;
// }


import { z } from 'zod';
import { DeviceSchema } from './Device'; // Já definido acima
import { GroupSchema } from './Group'; // Veremos isso abaixo

export const DevicesGroupSchema = z.object({
  id: z.string(),
  code: z.number(),
  id_locks: z.string(),
  id_groups: z.string(),
  groups: GroupSchema,
  locks: DeviceSchema,
});

// Inferindo o tipo DevicesGroup
export type DevicesGroup = z.infer<typeof DevicesGroupSchema>;