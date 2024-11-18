import type { Request, Response } from 'express';
import { prismaClient } from '../databases/PrismaClient';

export class LocksGroupsController {

  async create(req: Request, res: Response) {

  };

  async read(req: Request, res: Response) {
    

    const data = await prismaClient.groupsLocks.findMany({
      include: {
        groups: {
          select: {
            id: true,
            name: true
          }
        },
        locks: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return res.status(200).json({ groupsLocks: data });

  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {

  };

}