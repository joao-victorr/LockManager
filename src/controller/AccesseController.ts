import { Request, Response } from 'express';

import { prismaClient } from '../database/PrismaClient';
import { loginControl } from '../scripts/loginLock';


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

    if(!req.file || !req.body.user) {
        return res.status(400).json({err: "faltando dados"});
      }

      const acessUser: AcessUser = {
        name: req.body.name as string,
        image: req.file.buffer as Buffer,
        unidade: req.body.unidade as Array<{
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

    // loginControl();





    
    res.status(200).json({data: newAcess})
    

    

        


  };

  async read(req: Request, res: Response) {

  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {

  };

}