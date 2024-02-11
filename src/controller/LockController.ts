import { Request, Response } from 'express';
import { prismaClient } from '../databases/PrismaClient';
import { ApiError, BadResquestError } from '../helpers/apiErrors';


export class LockController {

  async create(req: Request, res: Response) {

    if(!req.body.lock.name || !req.body.lock.ip || !req.body.lock.user || !req.body.lock.password) {
      throw new BadResquestError("Data not found")
    }
    const lock = {
        name: req.body.name as string,
        ip: req.body.ip as string,
        user: req.body.user as string,
        password: req.body.password as string
    }

    const newLock = await prismaClient.lock.create({
        data: {
            name: lock.name.toUpperCase(),
            ip: lock.ip,
            user: lock.user,
            password: lock.password
        }
    })

    return res.status(201).json({"sucesse": newLock})
  };

  async read(req: Request, res: Response) {
    const lockId = req.query.id as string

    if(lockId) {
      const dataLock = await prismaClient.lock.findUnique({
        where: {id: lockId},
        select: {
          id: true,
          name: true,
          ip: true,
          DepartmentLock: {
            select: {
              id: true,
              code: true,
              department: true
            }
          }
        }
      })
      return res.status(200).json({Lock: dataLock})
    }

    const dataLock = await prismaClient.lock.findMany({
      select: {
        id: true,
        name: true,
        ip: true,
        DepartmentLock: {
          select: {
            id: true,
            code: true,
            department: true
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

    const countAccessLock = await prismaClient.accessLock.count({
      where: {
        id_lock: lockId
      }
    })

    const countDepartmentLock = await prismaClient.accessLock.count({
      where: {
        id_lock: lockId
      }
    })

    if(countAccessLock !== 0) {
      throw new BadResquestError("unit contains registered access.")
    }
    if(countDepartmentLock !== 0) {
      throw new BadResquestError("unit contains registered access.")
    }

    if(countDepartmentLock === 0 && countAccessLock === 0) {
      await prismaClient.lock.delete({where: {id: lockId}})
      return res.status(200).json({success: true})
    }
  };

}