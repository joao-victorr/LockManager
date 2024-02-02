
import { Request, Response } from 'express';

import { prismaClient } from '../database/PrismaClient';
import { createAccess } from '../scripts/requestFunction'


type AcessUser = {
  name: string;
  image: Buffer;
  unidade: Array<{
    name: string;
    ip: string;
    department: string;
  }>;
};

export class AccesseController {

  async create(req: Request, res: Response) {

    const bodyJson = JSON.parse(req.body.data)
    
    if(!req.file) {
        return res.status(400).json({err: "faltando dados"});
      }

      const acessUser: AcessUser = {
        name: bodyJson.name as string,
        image: req.file.buffer as Buffer,
        unidade: bodyJson.unidade as Array<{
          name: string;
          ip: string;
          department: string;
        }>
      };

    const newAcess = await prismaClient.access.create({
      data: {
        name: acessUser.name,
        image: acessUser.image
      }
    })
    
    res.status(201).json({data: newAcess})

    createAccess(acessUser)



  };

  async read(req: Request, res: Response) {

  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {

  };

}