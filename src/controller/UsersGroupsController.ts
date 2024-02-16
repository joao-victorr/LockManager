import { Request, Response } from 'express';
import { prismaClient } from '../databases/PrismaClient';
import { BadResquestError } from '../helpers/apiErrors';
import { createUserGroupLocks } from '../LockController/UsersGroups/CreateUserGroupsLocks';
import { DataUserGroup, UserGroup } from '../helpers/types';


export class UsersGroupsController {

  async create(req: Request, res: Response) {
    if(!req.body.data.id_user || !req.body.data.locks) {
      throw new BadResquestError("Data is required")
    };

    const data: DataUserGroup = req.body.data;

    const userGroups: Array<UserGroup> = await Promise.all(data.locks.map(async(lock) => {

      if(!lock.id_group || !lock.id_lock) {
        throw new BadResquestError("id_group and id_locks is required");
      }

      const userGroup = await prismaClient.locks.findUnique({
        where: {
          id: lock.id_lock
        },
        select: {
          id: true,
          GroupsLocks: {
            where: {id_groups: {equals: lock.id_group}},
            select: {code: true}
          },
          UsersLocks: {
            where: {id_users: {equals: data.id_user}},
            select: {code: true}
          }
        }
      })
      return userGroup;
    }))

    await createUserGroupLocks(userGroups);

    const newUserGroup = await Promise.all(data.locks.map(async(lock) => {
      const newLock = await prismaClient.usersGroups.create({
        data: {
          id_locks: lock.id_lock,
          id_groups: lock.id_group,
          id_users: data.id_user
        }
      })
      return newLock;
    }))    
    return res.json(newUserGroup)
  };

  async read(req: Request, res: Response) {

  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {

  };

}