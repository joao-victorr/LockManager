import { Request, Response } from 'express';
import { prismaClient } from '../databases/PrismaClient';

import { Group, DataLockCode } from '../helpers/types';
import { ApiError, BadResquestError } from '../helpers/apiErrors';
import { createGroupLocks } from '../LockController/Groups/CreateGroupsLocks';
// import { deletDataLock } from '../LockController/Groups/DeleteGroupsLocks';

export class GroupsController {
  
  async create(req: Request, res: Response) {
    if(!req.body.name || !req.body.locks) {
      throw new BadResquestError("Data Not Found")
    }
    
    const group: Group = {
      name: req.body.name,
      locks: req.body.locks
    }
    
    const codeAllGroupsLocks: Array<DataLockCode> = await createGroupLocks(group);
    
    const newGroup = await prismaClient.$transaction(async (tx: any) => {
      const newGroup = await tx.groups.create({
        data: {
          name: group.name
        },
      })

      const newGroupLock = await Promise.all(
        codeAllGroupsLocks.map(async(e) => {
          const GroupsLock = await tx.groupsLocks.create({
            data: {
              code: e.code,
              id_groups: newGroup.id,
              id_locks: e.id
            }
          })
          return GroupsLock;
        })
      )
      return {newGroup, newGroupLock}
    })

    return res.status(201).json({department: newGroup})

  };

  async read(req: Request, res: Response) {
    const group = {
      id: req.query.id as string,
      name: req.query.name as string
    }

    if(group.id) {
      const dataDepartment = await prismaClient.groups.findUnique({
        where: {id: group.id},
        include: {
          GroupsLocks: {
            select: {
              id_lock: true,
              code: true,
              locks: {
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

    if(group.name) {
      const dataDepartment = await prismaClient.groups.findMany({
        where: {id: group.id},
        include: {
          GroupsLocks: {
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

    const dataDepartment = await prismaClient.groups.findMany({
      include: {
        GroupsLocks: {
          select: {
            id: true,
            code: true,
            locks: {
              select: {
                id: true,
                name: true                  
              }
            }
          }
        }
      }
    })
    return res.status(200).json({groups: dataDepartment})

  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {
    // const id = req.body.id as string;

    // if(!id) {
    //   throw new BadResquestError("id is required")
    // }

    // const dataDepartment = await prismaClient.department.findUnique({
    //   where: {id},
    //   select: {
    //     id: true,
    //     DepartmentLock: {
    //       select: {
    //         code: true,
    //         id_lock: true
    //       }
    //     }
    //   }
    // })

    // if(!dataDepartment) {
    //   throw new BadResquestError("Department is required")
    // }

    // await prismaClient.$transaction(async (tx: any) => {

    //   await tx.departmentLock.deleteMany({
    //     where: {
    //       id_department: {
    //         equals: dataDepartment.id
    //       }
    //     }
    //   })

    //   await deletDataLock(dataDepartment)

    //   await tx.department.delete({
    //     where: {
    //       id: dataDepartment.id
    //     }
    //   })

    // })
    // return res.status(200).json({seccess: true})

  };

}