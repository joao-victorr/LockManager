import { Request, Response } from 'express';
import { prismaClient } from '../databases/PrismaClient';
import { Times } from '../helpers/types';
import { BadResquestError } from '../helpers/apiErrors';
import { createTimesLocks } from '../LockController/Times/CreateTimesLocks';

export class TimesController {

  async create(req: Request, res: Response) {

    if(!req.body.name || !req.body.timesSpans) {
      throw new BadResquestError("Data is required")
    }

    const times: Times = {
      name: req.body.name,
      locks: req.body.locks,
      timesSpans: req.body.timesSpans
    }

    const newTimes = await prismaClient.$transaction(async(tx: any) => {
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

      const codesTimesLocks = await createTimesLocks(times);

      const timesLocks = await Promise.all(codesTimesLocks.map(async(e) => {
        const timesZonesLocks = await tx.timeZonesLocks.create({
          data: {
            code: e.codeZones,
            id_locks: e.id,
            id_TimeZones: timesZones.id
          }
        })

        const timesSpansLocks = await tx.timeSpansLocks.create({
          data: {
            code: e.codeSpans,
            id_locks: e.id,
            id_TimeSpans: timesSpans.id
          }
        })
        
        return {timesZonesLocks, timesSpansLocks}
      }))

      const timesZonesLocks = timesLocks.map((lock) => lock.timesZonesLocks);
      const timesSpansLocks = timesLocks.map((lock) => lock.timesSpansLocks);

      return {timesZones, timesZonesLocks, timesSpans, timesSpansLocks}
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