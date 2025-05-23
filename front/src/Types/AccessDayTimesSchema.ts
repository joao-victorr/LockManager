import { z } from 'zod';
import { DeviceBasicInfoSchema } from './Device';

export const DayOfWeekSchema = z.object({
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
  devices: z.array(DeviceBasicInfoSchema),
  timeSpans: z.array(TimeSpansSchema),
});

// Inferindo o tipo TimeZones
export type TimeZones = z.infer<typeof TimeZonesSchema>;

// Inferindo o tipo TimeSpans
export type TimeSpans = z.infer<typeof TimeSpansSchema>;

// Inferindo o tipo DayOfWeek
export type DayOfWeek = z.infer<typeof DayOfWeekSchema>;


export type NewTimeZones = Omit<TimeZones, "id">;