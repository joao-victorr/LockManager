import { Request, Response } from 'express';
import { prismaClient } from '../databases/PrismaClient';

import { Department, DataUnitCode } from '../helpers/types';
import { ApiError, BadResquestError } from '../helpers/apiErrors';
import { createDepartmentLock } from '../LockController/DepartmentLock';
import { deletDataLock } from '../LockController/DeletDepartmentLock';

export class DepartmentController {
  
  async create(req: Request, res: Response) {
    if(!req.body.name || !req.body.units) {
      throw new BadResquestError("Data Not Found")
    }
    
    const department: Department = {
      name: req.body.name,
      units: req.body.units
    }
    
    const newDepartment = await prismaClient.$transaction(async (tx: any) => {
      const newDepartment = await tx.department.create({
        data: {
          name: department.name
        },
      })

      const codeAllDepartmentLock: Array<DataUnitCode> = await createDepartmentLock(department);

      const newDepartmentLock = await Promise.all(
        codeAllDepartmentLock.map(async(e) => {
          const DepartmentLock = await tx.departmentLock.create({
            data: {
              code: e.code,
              id_department: newDepartment.id,
              id_lock: e.id
            }
          })
          return DepartmentLock
        })
      )
      return {newDepartment: newDepartment, newDepartmentLock: newDepartmentLock}
    })

    return res.status(201).json({department: newDepartment})

  };

  async read(req: Request, res: Response) {
    const department = {
      id: req.query.id as string,
      name: req.query.name as string
    }
    console.log(department)

    if(department.id) {
      console.log("id", department.id)
      const dataDepartment = await prismaClient.department.findUnique({
        where: {id: department.id},
        include: {
          DepartmentLock: {
            select: {
              id_lock: true,
              code: true,
              lock: {
                select: {
                  name: true                  
                }
              }
            }
          }
        }
      })
      return res.status(200).json({department: dataDepartment})
    }

    if(department.name) {
      console.log("name", department.name)
      const dataDepartment = await prismaClient.department.findMany({
        where: {id: department.id},
        include: {
          DepartmentLock: {
            select: {
              id_lock: true,
              code: true,
              lock: {
                select: {
                  name: true                  
                }
              }
            }
          }
        }
      })
      return res.status (200).json({department: dataDepartment})
    }

    const dataDepartment = await prismaClient.department.findMany({
      include: {
        DepartmentLock: {
          select: {
            id: true,
            code: true,
            lock: {
              select: {
                id: true,
                name: true                  
              }
            }
          }
        }
      }
    })
    return res.status(200).json({department: dataDepartment})

  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {
    const id = req.body.id as string;

    if(!id) {
      throw new BadResquestError("id is required")
    }

    const dataDepartment = await prismaClient.department.findUnique({
      where: {id},
      select: {
        id: true,
        DepartmentLock: {
          select: {
            code: true,
            id_lock: true
          }
        }
      }
    })

    if(!dataDepartment) {
      throw new BadResquestError("Department is required")
    }

    await prismaClient.$transaction(async (tx: any) => {

      await tx.departmentLock.deleteMany({
        where: {
          id_department: {
            equals: dataDepartment.id
          }
        }
      })

      await deletDataLock(dataDepartment)

      await tx.department.delete({
        where: {
          id: dataDepartment.id
        }
      })

    })
    return res.status(200).json({seccess: true})

  };

}