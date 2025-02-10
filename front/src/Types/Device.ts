// import type { DevicesGroup } from "./DevicesGroups";



// export type Device = {
//   id: string;
//   name: string;
//   ip: string;
//   users: string;
//   UsersDevices: Array<string>;
//   GroupsDevices: Array<DevicesGroup>;
//   password: string;
//   status: boolean;
// }

// export type DeviceBasicInfo = Pick<Device, 'id' | 'name'>;




// import { z } from 'zod';

// // Esquema para Device
// export const DeviceSchema = z.object({
//   id: z.string(),
//   name: z.string(),
//   ip: z.string(),
//   users: z.string(),
//   UsersDevices: z.array(z.string()),
//   GroupsDevices: z.array(z.lazy(() => DevicesGroupSchema)), // Usando lazy para referências circulares
//   password: z.string(),
//   status: z.boolean(),
// });

// // Esquema para DeviceBasicInfo
// export const DeviceBasicInfoSchema = DeviceSchema.pick({
//   id: true,
//   name: true,
// });

// // Esquema para Group
// export const GroupSchema = z.object({
//   id: z.string(),
//   name: z.string(),
// });

// // Esquema para DevicesGroup
// export const DevicesGroupSchema = z.object({
//   id: z.string(),
//   code: z.number(),
//   id_locks: z.string(),
//   id_groups: z.string(),
//   groups: GroupSchema,
//   locks: DeviceSchema,
// });

// // Esquema para TimeZones
// export const TimeZonesSchema = z.object({
//   id: z.number(),
//   name: z.string(),
//   devices: z.array(DeviceBasicInfoSchema),
//   timeSpans: z.array(z.lazy(() => TimeSpansSchema)), // Usando lazy para referências circulares
// });

// // Esquema para TimeSpans
// export const TimeSpansSchema = z.object({
//   id: z.number(),
//   startHors: z.number(),
//   endHors: z.number(),
//   daysOfWeek: z.object({
//     sun: z.boolean(),
//     mon: z.boolean(),
//     tue: z.boolean(),
//     wed: z.boolean(),
//     thu: z.boolean(),
//     fri: z.boolean(),
//     sat: z.boolean(),
//   }),
// });

// // Esquema para User
// export const UserSchema = z.object({
//   id: z.string().optional(),
//   name: z.string(),
//   image: z.instanceof(ArrayBuffer),
//   device: z.array(DeviceSchema),
// });

// // Agora você pode usar esses esquemas para validar dados



import { z } from 'zod';

// Esquema para Device
export const DeviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  ip: z.string(),
  user: z.string(),
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
  status: true
});

// Inferindo o tipo DeviceBasicInfo
export type DeviceBasicInfo = z.infer<typeof DeviceBasicInfoSchema>;