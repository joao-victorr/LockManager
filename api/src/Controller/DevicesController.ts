import type { Request, Response } from 'express';
import { prismaClient } from '../databases/PrismaClient';
import { BadResquestError } from '../helpers/apiErrors';


export class DevicesController {

  async create(req: Request, res: Response) {

    if(!req.body.name || !req.body.ip || !req.body.user || !req.body.password || req.body.status == null) {
      throw new BadResquestError("Data not found")
    }
    const device = {
        name: req.body.name.toUpperCase(),
        ip: req.body.ip,
        user: req.body.user,
        password: req.body.password,
        status: req.body.status
    }

    const verifyIp = await prismaClient.devices.findUnique({
      where: { ip: device.ip },
      select: {
        id: true,
        ip: true
      }
    })

    if(verifyIp) {
      throw new BadResquestError("Device with this IP already exists")
    }

    const newDevice = await prismaClient.devices.create({
        data: {
            name: device.name,
            ip: device.ip,
            users: device.user,
            password: device.password,
            status: device.status
        }
    })

    return res.status(201).json({ newDevice })
  };

  async read(req: Request, res: Response) {
    const deviceId = req.query.id as string

    if(deviceId) {
      const dataDevice = await prismaClient.devices.findUnique({
        where: {id: deviceId},
        select: {
          id: true,
          name: true,
          ip: true,
          users: true,
          password: true,
          status: true,
          GroupsDevices: {
            select: {
              id: true,
              code: true,
              groups: true
            }
          },
          UsersDevices: {
            select: {
              id: true,
              code: true,
              users: true
            }
          }
        }
      })
      return res.status(200).json({device: dataDevice})
    }

    const dataDevice = await prismaClient.devices.findMany({
      select: {
        id: true,
        name: true,
        ip: true,
        users: true,
        password: true,
        status: true,
        GroupsDevices: {
          select: {
            id: true,
            code: true,
            groups: true
          }
        },
        UsersDevices: {
          select: {
            id: true,
            code: true,
            users: true
          }
        }
      }
    })

    return res.status(200).json({devices: dataDevice})
    
  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {
    const deviceId = req.body.id as string

    if(!deviceId) {
      throw new BadResquestError("Id is required")
    }

    const countAccessDevice = await prismaClient.usersDevices.count({
      where: {
        id_devices: deviceId
      }
    })

    const countDepartmentDevice = await prismaClient.groupsDevices.count({
      where: {
        id_devices: deviceId
      }
    })

    if(countAccessDevice !== 0 || countDepartmentDevice !== 0) {
      throw new BadResquestError("unit contains registered access.")
    }

    if(countDepartmentDevice === 0 && countAccessDevice === 0) {
      await prismaClient.devices.delete({where: {id: deviceId}})
      return res.status(200).json({success: true})
    }
  };

}