
import type { Request, Response } from 'express';
import { createTimesDevices } from '../DevicesController/Times/CreateTimesDevices';
import { type Prisma, prismaClient } from '../databases/PrismaClient';
import { BadResquestError } from '../helpers/apiErrors';
import type { Times } from '../helpers/types';

export class TimesController {

  async create(req: Request, res: Response) {

    if(!req.body.name || !req.body.timesSpans) {
      throw new BadResquestError("Data is required")
    }

    const times: Times = {
      name: req.body.name,
      devices: req.body.devices,
      timesSpans: req.body.timesSpans
    }

    const newTimes = await prismaClient.$transaction(async(tx: Prisma.TransactionClient) => {
      const timesZones = await tx.timeZones.create({
        data: {
          name: times.name
        }
      });

      const timesSpans = await tx.timeSpans.create({
        data: {
          time_zones_id: timesZones.id,
          start: times.timesSpans.start,
          end: times.timesSpans.end,
          sun: times.timesSpans.sun,
          mon: times.timesSpans.mon,
          tue: times.timesSpans.tue,
          wed: times.timesSpans.wed,
          thu: times.timesSpans.thu,
          fri: times.timesSpans.fri,
          sat: times.timesSpans.sat,
          hol1: times.timesSpans.hol1,
          hol2: times.timesSpans.hol2,
          hol3: times.timesSpans.hol3
        }
      });

      const codesTimesDevices = await createTimesDevices(times);

      const timesDevices = await Promise.all(codesTimesDevices.map(async(e) => {
        const timesZonesDevices = await tx.timeZonesDevices.create({
          data: {
            code: e.codeZones,
            id_devices: e.id,
            id_TimeZones: timesZones.id
          }
        })

        const timesSpansDevices = await tx.timeSpansDevices.create({
          data: {
            code: e.codeSpans,
            id_devices: e.id,
            id_TimeSpans: timesSpans.id
          }
        })
        
        return {timesZonesDevices, timesSpansDevices}
      }))

      const timesZonesDevices = timesDevices.map((device) => device.timesZonesDevices);
      const timesSpansDevices = timesDevices.map((device) => device.timesSpansDevices);

      return {timesZones, timesZonesDevices, timesSpans, timesSpansDevices}
    })
    
    console.log(newTimes)

    return res.json({newTimes});
  };

  async read(req: Request, res: Response) {

  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {

  };

}