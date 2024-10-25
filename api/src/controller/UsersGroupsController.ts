import type { Request, Response } from 'express';
import { createUserGroupLocks } from '../LockController/UsersGroups/CreateUserGroupsLocks';
import { prismaClient } from '../databases/PrismaClient';
import { ApiError, BadResquestError } from '../helpers/apiErrors';
import type { DataUserGroup, UserGroup } from '../helpers/types';


type GroupsLock = {
  id_lock: string,
  gruops: Array<{
    id: string
  }>
}

export class UsersGroupsController {

  async create(req: Request, res: Response) {

    const data: DataUserGroup = req.body;

    if(!data.id_user || !data.locks || data.locks.length === 0) {
      throw new BadResquestError("Data is required")
    }

    const userEndGruopsLocks: Array<UserGroup> = await Promise.all(data.locks.map( async (lock: GroupsLock) => {
      if( !lock.id_lock || !lock.gruops || lock.gruops.length === 0 ) {
        throw new BadResquestError("id_group and id_locks is required");
      }

      const userLock = await prismaClient.locks.findUnique({
        where: {
          id: lock.id_lock
        },
        select: {
          UsersLocks: {
            where: {id_users: {equals: data.id_user}},
            select: {code: true}
          }
        }
      })
      if(!userLock) {
        throw new BadResquestError("id_user not found in id_lock");
      }

      const gruopsLock = await Promise.all(lock.gruops.map( async (gruop) => {
        const gruopsLock = await prismaClient.locks.findUnique({
          where: {
            id: lock.id_lock
          },
          select: {
            GroupsLocks: {
              where: {id_groups: {equals: gruop.id}},
              select: {
                code: true,
                id_groups: true
              }
            }
          }
        })

        if(!gruopsLock) {
          throw new BadResquestError("id_group not found in id_lock");
        }

        return gruopsLock.GroupsLocks[0];
      }));

      const userEndGruop = {
        codeUserLock: userLock.UsersLocks[0].code,
        lock: {
          id_lock: lock.id_lock,
          codeGruops: gruopsLock
        }
      }

      return userEndGruop;
    }))


    await createUserGroupLocks(userEndGruopsLocks)

    const newUserGroup = await Promise.all(userEndGruopsLocks.map(async (userEndGruopsLock) => {
      return await Promise.all(userEndGruopsLock.lock.codeGruops.map(async (codeGruop) => {
        return await prismaClient.usersGroups.create({
          data: {
            id_users: data.id_user,
            id_locks: userEndGruopsLock.lock.id_lock,
            id_groups: codeGruop.id_groups
          }
        })
      }));
    }));

    res.json(newUserGroup)

  };

  async read(req: Request, res: Response) {

  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {

  };

}