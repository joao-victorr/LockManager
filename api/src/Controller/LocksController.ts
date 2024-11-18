import type { Request, Response } from 'express';
import { prismaClient } from '../databases/PrismaClient';
import { BadResquestError } from '../helpers/apiErrors';


export class LocksController {

  async create(req: Request, res: Response) {

    if(!req.body.name || !req.body.ip || !req.body.user || !req.body.password || req.body.status == null) {
      throw new BadResquestError("Data not found")
    }
    const lock = {
        name: req.body.name.toUpperCase(),
        ip: req.body.ip,
        user: req.body.user,
        password: req.body.password,
        status: req.body.status
    }

    const verifyIp = await prismaClient.locks.findUnique({
      where: { ip: lock.ip },
      select: {
        id: true,
        ip: true
      }
    })

    if(verifyIp) {
      throw new BadResquestError("Lock with this IP already exists")
    }

    const newLock = await prismaClient.locks.create({
        data: {
            name: lock.name,
            ip: lock.ip,
            users: lock.user,
            password: lock.password,
            status: lock.status
        }
    })

    return res.status(201).json({ newLock })
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
          users: true,
          password: true,
          status: true,
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
      return res.status(200).json({lock: dataLock})
    }

    const dataLock = await prismaClient.locks.findMany({
      select: {
        id: true,
        name: true,
        ip: true,
        users: true,
        password: true,
        status: true,
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

    return res.status(200).json({devices: dataLock})
    
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