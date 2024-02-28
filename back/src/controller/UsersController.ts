
import { Request, Response } from 'express';

import { prismaClient } from '../databases/PrismaClient';
import { createUserLock } from '../LockController/Users/CreateUserLocks';
// import  { deletAccessLock } from '../LockController/Users/DeleteUsersLocks';

import { Users } from '../helpers/types';
import { BadResquestError } from '../helpers/apiErrors';

export class UsersController {

  async create(req: Request, res: Response) {
    if (!req.file || !req.body.data) {
        throw new BadResquestError("Data Not Found");
    }

    const bodyJson = JSON.parse(req.body.data);

    const User: Users = {
        name: bodyJson.name.toUpperCase(),
        image: req.file.buffer,
        locks: bodyJson.locks
    };

    const newUser = await prismaClient.$transaction(async (tx: any) => {
      const user = await tx.users.create({ 
        data: {
          name: User.name,
          image: User.image
        }
      });

      const codeAllAccessLock = await createUserLock(User);

      const userLocks = await Promise.all(
        codeAllAccessLock.map(async (e) => {
          const newUsersLock = await tx.usersLocks.create({
            data: {
              code: e.code,
              id_users: user.id,
              id_locks: e.id,
            }
          });
          return newUsersLock;
        })
      );
      return {user, userLocks}
    });

    res.status(201).json({ data: newUser });
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
          UsersLocks: {
            select: {
              id_locks: true,
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
          UsersLocks: {
            select: {
              id_locks: true,
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
        UsersLocks: {
          select: {
            id_locks: true
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
    //     userLock: {
    //       where: {
    //         id_lock: user.unidade[0].id
    //       }
    //     }
    //   }
    // })

    // res.json({datauser})

    // deletuserLock(datauser);

    // if (datauser.id) {
    //   const delet = await prismaClient.user.delete({where: {id: dataAccess.id}});
    //   return res.json({ delete: "Success"});
    // }

  
  };
}