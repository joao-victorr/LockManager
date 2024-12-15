import type { Request, Response } from 'express';
import { prismaClient } from '../databases/PrismaClient';
import { ApiError, BadResquestError } from '../helpers/apiErrors';

export class UserDevicesController {

  async create(req: Request, res: Response) {

    const userId = req.body.userId;
    const devicesId: Array<string> = req.body.devicesId;

    const user = await prismaClient.users.findUnique({
      where: { id: userId }
    })

    const devices = await Promise.all(
      devicesId.map(async id =>  {
        const device = await prismaClient.devices.findUnique({where: { id }})
  
        if (!device) {
          throw new BadResquestError(`Device not found: ${id}`);
        }
  
        return device;
      })
    )
  };

  async read(req: Request, res: Response) {

  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {

  };

}