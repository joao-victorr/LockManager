import { z } from 'zod';
import { DeviceBasicInfoSchema } from './Device';


export const TimeSpansSchema = z.object({
  id: z.number(),
  timeZonesId: z.number(),
  startHors: z.number(),
  endHors: z.number(),
  sun: z.boolean(),
  mon: z.boolean(),
  tue: z.boolean(),
  wed: z.boolean(),
  thu: z.boolean(),
  fri: z.boolean(),
  sat: z.boolean(),
  hol1: z.boolean(),
  hol2: z.boolean(),
  hol3: z.boolean()
});


export const TimeZonesSchema = z.object({
  id: z.number(),
  name: z.string(),
  timeZonesDevices: z.array(z.object({
    id: z.number(),
    idDevices: z.string(),
    idTimeZones: z.number(),
    devices: DeviceBasicInfoSchema
  })),
  timeSpans: z.array(TimeSpansSchema),
});


export const TimeZonesBasicInfoSchema = TimeZonesSchema.pick({
  id: true,
  name: true,
});


export const DataTimeZonesSchema = z.object({
  name: z.string(),
  devices: z.array(DeviceBasicInfoSchema),
  timeSpans: z.array(TimeSpansSchema),
});

// Inferindo o tipo TimeZones
export type TimeZones = z.infer<typeof TimeZonesSchema>;


export type TimeSpans = z.infer<typeof TimeSpansSchema>;


export type DataTimeZones = z.infer<typeof DataTimeZonesSchema>


export type TimeZonesBasicInfo = z.infer<typeof TimeZonesBasicInfoSchema>;