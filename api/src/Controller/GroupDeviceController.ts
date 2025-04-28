import type { Request, Response } from 'express';
import { GroupDevice } from '../DevicesController/Groups/GroupDevices';
import { AuthDevice } from '../DevicesController/LoginDevice';
import { prismaClient } from '../databases/PrismaClient';
import { DeviceSchema } from '../helpers/Types/Device';
import { CreateGroupSchema, SearchGroupDeviceSchema } from '../helpers/Types/GroupDevicesSchemas';
import { BadResquestError } from '../helpers/apiErrors';

export class DevicesGroupsController {

  async create(req: Request, res: Response) {
    const { groupId, devicesId } = CreateGroupSchema.parse(req.body);
  
    const group = await prismaClient.groups.findUnique({
      where: { id: groupId },
      select: { id: true, name: true }
    });
  
    if (!group) {
      throw new BadResquestError("Group not found");
    }
  
    const newGroupInDevices = await Promise.allSettled(
      devicesId.map(async (id) => {
        return prismaClient.$transaction(async (tx) => {
          const rawDevice = await tx.devices.findUnique({ where: { id } });
  
          if (!rawDevice) {
            throw new Error('Device not found');
          }
  
          const device = DeviceSchema.parse(rawDevice);
  
          if (!device.status) {
            throw new BadResquestError("Device offline");
          }

          const existingAssociation = await tx.groupsDevices.findUnique({
            where: {
              idGroups_idDevices: {
                idGroups: group.id,
                idDevices: id
              }
            }
          });
          
          if (existingAssociation) {
            throw new Error('Device already associated with this group');
          }
  
          // Primeiro cria a associação no banco
          const associateGroupInDevice = await tx.groupsDevices.create({
            data: {
              idDevices: id,
              idGroups: group.id
            }
          });
  
          // Depois tenta fazer a comunicação com o device
          const authDevice = new AuthDevice(device.ip, device.user, device.password);
          const getSession = await authDevice.login();
          const session = getSession.session;
  
          if (!session) {
            throw new Error('Failed to create session');
          }
  
          const groupDevice = new GroupDevice(device.ip, session);
          const createdGroupInDevice = await groupDevice.createGroup(group.id, group.name);
  
          if (!createdGroupInDevice.success) {
            console.error(createdGroupInDevice);
            throw new Error('Failed to create group in device');
          }
  
          const newGroupInDevice = createdGroupInDevice.data.ids[0];
  
          if (newGroupInDevice !== group.id + 1000) {
            throw new Error('Mismatch in group id');
          }
  
          await authDevice.logout(session);
  
          return { deviceId: device.id };
        });
      })
    );
  
    const success = newGroupInDevices
      .filter(result => result.status === 'fulfilled')
      .map(result => (result as PromiseFulfilledResult<{ deviceId: string }>).value);
  
    const failed = newGroupInDevices
      .filter(result => result.status === 'rejected')
      .map((result, index) => ({
        deviceId: devicesId[index], 
        error: (result as PromiseRejectedResult).reason.message || 'Unknown error'
      }));
  
    return res.status(200).json({ success, failed });
  }

  async read(req: Request, res: Response) {
    const { groupId, deviceId,  } = SearchGroupDeviceSchema.parse(req.query);
  
    const group = await prismaClient.groups.findUnique({
      where: { id: groupId },
      select: {
        id: true,
        name: true,
        groupsDevices: {
          select: {
            devices: {
              select: {
                id: true,
                name: true,
                ip: true,
                status: true,
              },
            },
          },
        },
      },
    });
  
    if (!group) {
      throw new BadResquestError("Group not found");
    }
  
    const devices = group.groupsDevices.map((groupDevice) => groupDevice.devices);
  
    return res.status(200).json({
      groupId: group.id,
      groupName: group.name,
      devices,
    });
  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {

  };

}

