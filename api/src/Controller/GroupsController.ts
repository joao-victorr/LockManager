import type { Request, Response } from 'express';
import { type Prisma, prismaClient } from '../databases/PrismaClient';

import { createGroupDevices } from '../DevicesController/Groups/CreateGroupsDevices';
import { ApiError, BadResquestError } from '../helpers/apiErrors';
import type { DataDeviceCode, Group } from '../helpers/types';
// import { deletDataDevice } from '../DeviceController/Groups/DeleteGroupsDevices';

export class GroupsController {
  
  async create(req: Request, res: Response) {
    if(!req.body.name || !req.body.devices) {
      throw new BadResquestError("Data Not Found")
    }
    
    const group: Group = {
      name: req.body.name,
      devices: req.body.devices
    }
    
    const codeAllGroupsDevices: Array<DataDeviceCode> = await createGroupDevices(group);
    
      const newGroup = await prismaClient.$transaction(async (tx: Prisma.TransactionClient) => {
      const newGroup = await tx.groups.create({
        data: {
          name: group.name
        },
      })

      const newGroupDevice = await Promise.all(
        codeAllGroupsDevices.map(async(e) => {
          const GroupsDevice = await tx.groupsDevices.create({
            data: {
              code: e.code,
              id_groups: newGroup.id,
              id_devices: e.id
            }
          })
          return GroupsDevice;
        })
      )
      return {newGroup, newGroupDevice}
    })

    return res.status(201).json({department: newGroup})

  };

  async read(req: Request, res: Response) {
    const group = {
      id: req.query.id as string,
      name: req.query.name as string
    }

    if(group.id) {
      const dataDepartment = await prismaClient.groups.findUnique({
        where: {id: group.id},
        include: {
          GroupsDevices: {
            select: {
              id_devices: true,
              code: true,
              devices: {
                select: {
                  name: true                  
                }
              }
            }
          }
        }
      })
      return res.status(200).json({department: dataDepartment})
    }

    if(group.name) {
      const dataDepartment = await prismaClient.groups.findMany({
        where: {id: group.id},
        include: {
          GroupsDevices: {
            select: {
              id_devices: true,
              code: true,
              devices: {
                select: {
                  name: true                  
                }
              }
            }
          }
        }
      })
      return res.status (200).json({department: dataDepartment})
    }

    const dataDepartment = await prismaClient.groups.findMany({
      include: {
        GroupsDevices: {
          select: {
            id: true,
            code: true,
            devices: {
              select: {
                id: true,
                name: true                  
              }
            }
          }
        }
      }
    })
    return res.status(200).json({groups: dataDepartment})

  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {
    // const id = req.body.id as string;

    // if(!id) {
    //   throw new BadResquestError("id is required")
    // }

    // const dataDepartment = await prismaClient.department.findUnique({
    //   where: {id},
    //   select: {
    //     id: true,
    //     DepartmentDevice: {
    //       select: {
    //         code: true,
    //         id_device: true
    //       }
    //     }
    //   }
    // })

    // if(!dataDepartment) {
    //   throw new BadResquestError("Department is required")
    // }

    // await prismaClient.$transaction(async (tx: any) => {

    //   await tx.departmentDevice.deleteMany({
    //     where: {
    //       id_department: {
    //         equals: dataDepartment.id
    //       }
    //     }
    //   })

    //   await deletDataDevice(dataDepartment)

    //   await tx.department.delete({
    //     where: {
    //       id: dataDepartment.id
    //     }
    //   })

    // })
    // return res.status(200).json({seccess: true})

  };

}