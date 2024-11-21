import type { Request, Response } from 'express';
import { prismaClient } from '../databases/PrismaClient';

export class DevicesGroupsController {

  async create(req: Request, res: Response) {

  };

  async read(req: Request, res: Response) {
    

    const data = await prismaClient.groupsDevices.findMany({
      include: {
        groups: {
          select: {
            id: true,
            name: true
          }
        },
        devices: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return res.status(200).json({ groupsDevices: data });

  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {

  };

}