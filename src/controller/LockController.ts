import { Request, Response } from 'express';
import { prismaClient } from '../database/PrismaClient';

export class LockController {

  async create(req: Request, res: Response) {

    const lock = {
        name: req.body.name as String,
        ip: req.body.ip as String
    }

    const newLock = await prismaClient.lock.create({
        data: {
            name: lock.name as string,
            ip: lock.ip as string
        }
    })

    res.status(201).json({"sucesse": newLock})
    return JSON.stringify({"sucesse": newLock})

  };

  async read(req: Request, res: Response) {

  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {

  };

}