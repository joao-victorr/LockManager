import { Request, Response } from 'express';
import { prismaClient } from '../databases/PrismaClient';
import { AccessRules, DataLockCode } from '../helpers/types';
import { BadResquestError } from '../helpers/apiErrors';
import { createAccessRulesLocks } from '../LockController/AccessRules/CreateAccessRules';

export class AcccessRulesController {

  async create(req: Request, res: Response) {

    if(!req.body.id_groups || !req.body.id_TimeZones || !req.body.locks){
      throw new BadResquestError("Data is required");
    }

    const accessRules = {
      id_groups: req.body.id_groups as string,
      id_TimeZones: req.body.id_TimeZones as string,
      locks: req.body.locks as Array<{id: string}>
    }

    const dataAccessRules = await Promise.all(accessRules.locks.map(async (lock) => {
      const locks: AccessRules = await prismaClient.locks.findUnique({
        where: { id: lock.id },
        select: {
          id: true,
          GroupsLocks: {
            where: {
              id_groups: { equals: accessRules.id_groups }
            },
            select: { code: true }
          },
          TimeZonesLocks: {
            where: {
              id_TimeZones: { equals: accessRules.id_TimeZones }
            },
            select: { code: true }
          }
        }
      });
  
      return locks;
    }))

    const dataUnitsCodes: Array<DataLockCode> = await createAccessRulesLocks(dataAccessRules);

    const newAccessRules = await Promise.all(dataUnitsCodes.map(async (unitCode) => {
      const newAccessRules = await prismaClient.acccessRules.create({
        data: {
          code: unitCode.code,
          id_locks: unitCode.id,
          id_groups: accessRules.id_groups,
          id_TimeZones: accessRules.id_TimeZones
        }
      })
      return newAccessRules;
    }))

    return res.json({newAccessRules})

  };

  async read(req: Request, res: Response) {

  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {

  };

}