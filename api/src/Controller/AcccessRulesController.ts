import type { Request, Response } from 'express';
import { createAccessRulesDevices } from '../DevicesController/AccessRules/CreateAccessRules';
import { prismaClient } from '../databases/PrismaClient';
import { BadResquestError } from '../helpers/apiErrors';
import type { AccessRules, DataDeviceCode } from '../helpers/types';

export class AcccessRulesController {

  async create(req: Request, res: Response) {

    if(!req.body.id_groups || !req.body.id_TimeZones || !req.body.devices){
      throw new BadResquestError("Data is required");
    }

    const accessRules = {
      id_groups: req.body.id_groups as string,
      id_TimeZones: req.body.id_TimeZones as string,
      devices: req.body.devices as Array<{id: string}>
    }

    const dataAccessRules = await Promise.all(accessRules.devices.map(async (device) => {
      const devices: AccessRules | null = await prismaClient.devices.findUnique({
        where: { id: device.id },
        select: {
          id: true,
          GroupsDevices: {
            where: {
              id_groups: { equals: accessRules.id_groups }
            },
            select: { code: true }
          },
          TimeZonesDevices: {
            where: {
              id_TimeZones: { equals: accessRules.id_TimeZones }
            },
            select: { code: true }
          }
        }
      });
  
      if (!devices) {
        throw new BadResquestError("Device not found");
      }
      
      return devices;
    }))

    const dataUnitsCodes: Array<DataDeviceCode> = await createAccessRulesDevices(dataAccessRules);

    const newAccessRules = await Promise.all(dataUnitsCodes.map(async (unitCode) => {
      const newAccessRules = await prismaClient.acccessRules.create({
        data: {
          code: unitCode.code,
          id_devices: unitCode.id,
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