import type { Request, Response } from 'express';
import { AccessRules } from '../DevicesController/AccessRules/AccessRulesDevices';
import { AuthDevice } from '../DevicesController/LoginDevice';
import { prismaClient } from '../databases/PrismaClient';
import { CreateAccessRulesSchema } from '../helpers/Types/AccessRules';
import { BadResquestError } from '../helpers/apiErrors';

export class AcccessRulesController {

  async create(req: Request, res: Response) {
    const data = CreateAccessRulesSchema.parse(req.body);

    const group = await prismaClient.groups.findUnique({where: { id: data.groupId }});

    if(!group) {
      throw new BadResquestError("Group is required");
    }

    const allAccessRules = await Promise.allSettled(
      data.access.map(async (item) => {
        const deviceTimeZones = await prismaClient.timeZonesDevices.findUnique({
          where: {
            idTimeZones_idDevices: {
              idDevices: item.deviceId,
              idTimeZones: item.timeZonesId
            }
          },
          include: {
            devices: true
          }
        })

        const deviceGroup = await prismaClient.groupsDevices.findUnique({
          where: {
            idGroups_idDevices: {
              idDevices: item.deviceId,
              idGroups: group.id
            }
          }
        })

        if(!deviceTimeZones || !deviceGroup) {
          throw new BadResquestError("DeviceId, deviceGroupId or TimeZonesId invalid");
        }

        const newAccessRules = await prismaClient.accessRules.create({
          data: {
            idDevices: item.deviceId,
            idGroups: group.id,
            idTimeZones: item.timeZonesId
          }
        });

        if(!newAccessRules) {
          throw new BadResquestError("Erro ao criar accesso rules");
        }

        // Parte de criação da regra de acesso no dispositivos

        const authDevice = new AuthDevice(deviceTimeZones.devices.ip, deviceTimeZones.devices.user, deviceTimeZones.devices.password);
        const session = (await authDevice.login()).session

        if(!session) {
          throw new BadResquestError("Falha no login");
        }

        const accessRules = new AccessRules(deviceTimeZones.devices.ip, session);

        const newAccessRulesDevice = accessRules.createGroup(newAccessRules.id, group.id, item.timeZonesId);

        if(!newAccessRulesDevice) {
          throw new BadResquestError("Falha ao cadastrar access rules no dispositivo");
        }

        return {
          success: true,
          ids: {
            deviceId: item.deviceId,
            timeZonesId: item.timeZonesId
           }
        }


      })
    )

    console.log(allAccessRules);

    res.json(allAccessRules).status(201);
  
  };

  async read(req: Request, res: Response) {

  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {

  };

}