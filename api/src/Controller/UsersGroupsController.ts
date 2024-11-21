import type { Request, Response } from 'express';
import { createUserGroupDevices } from '../DevicesController/UsersGroups/CreateUserGroupsDevices';
import { prismaClient } from '../databases/PrismaClient';
import { ApiError, BadResquestError } from '../helpers/apiErrors';
import type { DataUserGroup, UserGroup } from '../helpers/types';


type GroupsDevice = {
  id_device: string,
  groups: Array<{
    id: string
  }>
}

export class UsersGroupsController {

  async create(req: Request, res: Response) {

    const data: DataUserGroup = req.body;
    console.log(data)


    if(!data.id_user || !data.devices || data.devices.length === 0) {
      throw new BadResquestError("Data is required")
    }
    

    const userEndGruopsDevices: Array<UserGroup> = await Promise.all(data.devices.map( async (device: GroupsDevice) => {
      if( !device.id_device || !device.gruops || device.gruops.length === 0 ) {
        throw new BadResquestError("id_group and id_devices is required");
      }

      const userDevice = await prismaClient.devices.findUnique({
        where: {
          id: device.id_device
        },
        select: {
          UsersDevices: {
            where: {id_users: {equals: data.id_user}},
            select: {code: true}
          }
        }
      })
      if(!userDevice) {
        throw new BadResquestError("id_user not found in id_device");
      }

      const gruopsDevice = await Promise.all(device.gruops.map( async (gruop) => {
        const gruopsDevice = await prismaClient.devices.findUnique({
          where: {
            id: device.id_device
          },
          select: {
            GroupsDevices: {
              where: {id_groups: {equals: gruop.id}},
              select: {
                code: true,
                id_groups: true
              }
            }
          }
        })

        if(!gruopsDevice) {
          throw new BadResquestError("id_group not found in id_device");
        }

        return gruopsDevice.GroupsDevices[0];
      }));

      const userEndGruop = {
        codeUserDevice: userDevice.UsersDevices[0].code,
        device: {
          id_device: device.id_device,
          codeGruops: gruopsDevice
        }
      }

      return userEndGruop;
    }))


    await createUserGroupDevices(userEndGruopsDevices)

    const newUserGroup = await Promise.all(userEndGruopsDevices.map(async (userEndGruopsDevice) => {
      return await Promise.all(userEndGruopsDevice.device.codeGruops.map(async (codeGruop) => {
        return await prismaClient.usersGroups.create({
          data: {
            id_users: data.id_user,
            id_devices: userEndGruopsDevice.device.id_device,
            id_groups: codeGruop.id_groups
          }
        })
      }));
    }));

    return res.status(201).json(newUserGroup)

  };

  async read(req: Request, res: Response) {

  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {

  };

}