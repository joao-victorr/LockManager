import { Request, Response } from 'express';
import { prismaClient } from '../databases/PrismaClient';
import { ApiError, BadResquestError } from '../helpers/apiErrors';


export class LocksController {

  async create(req: Request, res: Response) {

    if(!req.body.name || !req.body.ip || !req.body.user || !req.body.password) {
      throw new BadResquestError("Data not found")
    }
    const lock = {
        name: req.body.name.toUpperCase() as string,
        ip: req.body.ip as string,
        user: req.body.user as string,
        password: req.body.password as string
    }

    const newLock = await prismaClient.locks.create({
        data: {
            name: lock.name,
            ip: lock.ip,
            users: lock.user,
            password: lock.password
        }
    })

    return res.status(201).json({successe: newLock})
  };

  async read(req: Request, res: Response) {
    const lockId = req.query.id as string

    if(lockId) {
      const dataLock = await prismaClient.locks.findUnique({
        where: {id: lockId},
        select: {
          id: true,
          name: true,
          ip: true,
          GroupsLocks: {
            select: {
              id: true,
              code: true,
              groups: true
            }
          },
          UsersLocks: {
            select: {
              id: true,
              code: true,
              users: true
            }
          }
        }
      })
      return res.status(200).json({Lock: dataLock})
    }

    const dataLock = await prismaClient.locks.findMany({
      select: {
        id: true,
        name: true,
        ip: true,
        GroupsLocks: {
          select: {
            id: true,
            code: true,
            groups: true
          }
        },
        UsersLocks: {
          select: {
            id: true,
            code: true,
            users: true
          }
        }
      }
    })

    return res.status(200).json({Locks: dataLock})
    
  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {
    const lockId = req.body.id as string

    if(!lockId) {
      throw new BadResquestError("Id is required")
    }

    const countAccessLock = await prismaClient.usersLocks.count({
      where: {
        id_locks: lockId
      }
    })

    const countDepartmentLock = await prismaClient.groupsLocks.count({
      where: {
        id_locks: lockId
      }
    })

    if(countAccessLock !== 0 || countDepartmentLock !== 0) {
      throw new BadResquestError("unit contains registered access.")
    }

    if(countDepartmentLock === 0 && countAccessLock === 0) {
      await prismaClient.locks.delete({where: {id: lockId}})
      return res.status(200).json({success: true})
    }
  };

}