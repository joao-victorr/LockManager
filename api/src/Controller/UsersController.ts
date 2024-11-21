
import type { Request, Response } from 'express';

import { createUserDevice } from '../DevicesController/Users/CreateUserDevices';
import { type Prisma, prismaClient } from '../databases/PrismaClient';
// import  { deletAccessDevice } from '../DeviceController/Users/DeleteUsersDevices';

import { BadResquestError } from '../helpers/apiErrors';
import type { Users } from '../helpers/types';

export class UsersController {

  async create(req: Request, res: Response) {
    if (!req.file || !req.body.data) {
        throw new BadResquestError("Data Not Found");
    }

    const bodyJson = JSON.parse(req.body.data);

    const User: Users = {
        name: bodyJson.name.toUpperCase(),
        image: req.file.buffer,
        devices: bodyJson.devices
    };

    const newUser = await prismaClient.$transaction(async (tx: Prisma.TransactionClient) => {
      const user = await tx.users.create({ 
        data: {
          name: User.name,
          image: User.image
        }
      });

      const codeAllAccessDevice = await createUserDevice(User);

      const userDevices = await Promise.all(
        codeAllAccessDevice.map(async (e) => {
          const newUsersDevice = await tx.usersDevices.create({
            data: {
              code: e.code,
              id_users: user.id,
              id_devices: e.id,
            }
          });
          return newUsersDevice;
        })
      );
      return {user, userDevices}
    });
    
    res.status(201).json({ newUser });
    
  }

  async read(req: Request, res: Response) {
    const user = {
      id: req.query.id as string,
      name: req.query.name as string,
    };

    if (user.id) {
      const DataUser = await prismaClient.users.findUnique({
        where: {
          id: user.id
        },
        select: {
          id: true,
          name: true,
          UsersDevices: {
            select: {
              id_devices: true,
              code: true,
            },
          },
        },
  
      })
      return res.json( { DataUser } )
    }

    if (user.name) {
      const dataUsers = await prismaClient.users.findMany({
        where: {
          name: {
            contains: user.name
          }
        },
        select: {
          id: true,
          name: true,
          UsersDevices: {
            select: {
              id_devices: true,
              code: true,
            },
          },
        },
      })
      return res.json( { dataUsers } )
    }

    const allUsers = await prismaClient.users.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        UsersDevices: {
          select: {
            id_devices: true
          },
        },
        UsersGroups: {
          select: {
            id_groups: true
          }
        }
      },
    });


    return res.json( { allUsers });

  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {

    // const user: DeletData = {
    //   id: req.body.id,
    //   unidade: req.body.unidade
    // }

    // const datauser = await prismaClient.user.findUnique({
    //   where: {id: user.id},
    //   select: {
    //     id: true,
    //     userDevice: {
    //       where: {
    //         id_device: user.unidade[0].id
    //       }
    //     }
    //   }
    // })

    // res.json({datauser})

    // deletuserDevice(datauser);

    // if (datauser.id) {
    //   const delet = await prismaClient.user.delete({where: {id: dataAccess.id}});
    //   return res.json({ delete: "Success"});
    // }

  
  };
}