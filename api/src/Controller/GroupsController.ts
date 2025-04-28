import type { Request, Response } from 'express';
import { prismaClient } from '../databases/PrismaClient';
import { SearchGroupSchema } from '../helpers/Types/Group';
import { BadResquestError } from '../helpers/apiErrors';
// import { type Prisma, prismaClient } from '../databases/PrismaClient';
// import { ApiError, BadResquestError } from '../helpers/apiErrors';

export class GroupsController {
  
  async create(req: Request, res: Response) {
    const name  = req.body.name;

    if(!name) {
      throw new BadResquestError("Name is require")
    }

    const newGroup = await prismaClient.groups.create({
      data: {
        name: name
      }
    })

    return res.status(201).json(newGroup);
  }

  async read(req: Request, res: Response) {
    const { id, name } = req.query;

    // Se pesquisar por ID
    if (id) {
      const group = await prismaClient.groups.findUnique({
        where: {
          id: Number(id)
        },
        select: {
          id: true,
          name: true,
          groupsDevices: true,
          _count: {
            select: {
              accessRules: true,
              groupsDevices: true,
              usersGroups: true
            }
          }
        }
      });

      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }

      return res.json(group);
    }

    // Se pesquisar por NAME
    if (name) {
      const groups = await prismaClient.groups.findMany({
        where: {
          name: {
            contains: String(name)
          }
        },
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              accessRules: true,
              groupsDevices: true,
              usersGroups: true
            }
          }
        }
      });
    
      return res.json(groups);
    }
    

    // Se não passar nada, lista todos
    const allGroups = await prismaClient.groups.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            accessRules: true,
            groupsDevices: true,
            usersGroups: true
          }
        }
      }
    });

    return res.json(allGroups);
  
  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {
  
  };

}
