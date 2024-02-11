
import { Request, Response } from 'express';

import { prismaClient } from '../databases/PrismaClient';
import { createAccessLock } from '../LockController/CreateAccessLock';
import  { deletAccessLock } from '../LockController/DeletAccessLock';

import { Access, DeletData } from '../helpers/types';
import { ApiError, BadResquestError } from '../helpers/apiErrors';

export class AccesseController {

  async create(req: Request, res: Response) {
    if (!req.file || !req.body.data) {
        throw new BadResquestError("Data Not Found");
    }

    const bodyJson = JSON.parse(req.body.data);

    const accessUser: Access = {
        name: bodyJson.name.toUpperCase(),
        image: req.file.buffer,
        unit: bodyJson.unidade
    };

    const newAccess = await prismaClient.$transaction(async (tx: any) => {
      const access = await tx.access.create({ 
        data: {
          name: accessUser.name,
          image: accessUser.image
        }
      });

      const codeAllAccessLock = await createAccessLock(accessUser);

      const accessLock = await Promise.all(
        codeAllAccessLock.map(async (e) => {
          const newAccessLock = await tx.accessLock.create({
            data: {
              code: e.code,
              id_access: access.id,
              id_lock: e.id,
            }
          });
          return newAccessLock;
        })
      );

      return {access, accessLock}; 
    });

    res.status(201).json({ data: newAccess });
  }

  async read(req: Request, res: Response) {
    const Access = {
      id: req.query.id as string,
      name: req.query.name as string,
    };

    if (Access.id) {
      const access = await prismaClient.access.findUnique({
        where: {
          id: Access.id
        },
        include: {
          AccessLock: {
            select: {
              id_lock: true,
              code: true,
            },
          },
        },
  
      })
      return res.json( { access } )
    }

    if (Access.name) {
      const access = await prismaClient.access.findMany({
        where: {
          name: {
            contains: Access.name
          }
        },
        include: {
          AccessLock: {
            select: {
              id_lock: true,
              code: true,
            },
          },
        },
      })
      return res.json( { access } )
    }

    const allAccess = await prismaClient.access.findMany({
      include: {
        AccessLock: {
          select: {
            id_lock: true,
            code: true,
          },
        },
      },
    });


    return res.json( { allAccess });

  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {

    const access: DeletData = {
      id: req.body.id,
      unidade: req.body.unidade
    }

    // const dataAccess = await prismaClient.access.findUnique({
    //   where: {id: access.id},
    //   select: {
    //     id: true,
    //     AccessLock: {
    //       where: {
    //         id_lock: access.unidade[0].id
    //       }
    //     }
    //   }
    // })

    // res.json({dataAccess})

    // deletAccessLock(dataAccess);

    // if (dataAccess.id) {
    //   const delet = await prismaClient.access.delete({where: {id: dataAccess.id}});
    //   return res.json({ delete: "Success"});
    // }

  
  };

}