import bcrypt from 'bcrypt';
import type { Request, Response, } from 'express';
import { prismaClient } from '../databases/PrismaClient';

import { BadResquestError } from '../helpers/apiErrors';
import type { UserWeb } from '../helpers/types';
import { generateToken } from '../middleware/PassportMiddleware';



export class UserWebController {

  async create(req: Request, res: Response) {

    const user = {
      name: req.body.name as string,
      email: req.body.email.toLowerCase().trim() as string,
      password: req.body.password.trim() as string
    };

    if(!user.email || !user.password || !user.name) {
      throw new BadResquestError("Data is required")
    }

    const varifyEmail = await prismaClient.usersWeb.findUnique({where: {email: user.email}})

    if(varifyEmail) {
      throw new BadResquestError(("Email exist"))
    }

    const hashPassword = await bcrypt.hash(user.password, 10)

    const newUser = await prismaClient.usersWeb.create({
      data: {
        email: user.email,
        name: user.name,
        password: hashPassword,
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    const token = generateToken(newUser);

    return res.status(201).json({ newUser, token });

  };

  async read(req: Request, res: Response) {

    const dataUser: UserWeb = {
      id: req.query.id as string,
      name: req.query.name as string,
      email: req.query.email as string,
    };

    if (dataUser.id) {
      const user = await prismaClient.usersWeb.findUnique({ 
        where: { id: dataUser.id }, 
        select: {
        id: true,
        name: true,
        email: true
        }
      })

      
      return res.json( { user } )
    }

    if (dataUser.email) {
      const user = await prismaClient.usersWeb.findUnique({
        where: { email: dataUser.email.toLowerCase().trim() },
        select: {
          id: true,
          name: true,
          email: true
        }
      });

      return res.json( { user } )
    }

    if (dataUser.name) {
      const users = await prismaClient.usersWeb.findMany({
        where: {
          name: {
            contains: dataUser.name
          }
        },
        select: {
          id: true,
          name: true,
          email: true
        }
      })

      return res.json( { users } )
    }

    const users = await prismaClient.usersWeb.findMany({
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    return res.json( { users } )

  };

  async update(req: Request, res: Response) {
    
  //   const userId = req.body.id as string;


  //   const { newName, newEmail, newPassword } = req.body;

  // try {
  //   const existingUser = await prismaClient.users.findUnique({
  //     where: { id: userId },
  //   });

  //   if (!existingUser) {
  //     return res.status(404).json({ error: 'Usuário não encontrado' });
  //   }

  //   const updatedUser = await prismaClient.users.update({
  //     where: { id: userId },
  //     data: {
  //       name: newName || existingUser.name,
  //       email: newEmail || existingUser.email,
  //       password: newPassword || existingUser.password,
  //     },
  //   });

  //   return res.json({ message: 'Usuário atualizado com sucesso', user: updatedUser });
  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).json({ error: 'Erro interno do servidor' });
  // }

  };

  async delete(req: Request, res: Response) {
    const id = req.body.id as string;

    try {

      const user = await prismaClient.usersWeb.delete({
        where: { id },
      });

      return res.json({ success: true});

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (err: any) {

      if(err.code === 'P2025') {
        return res.json({ "Error": "Registro não encontrado" });
      }

    }
      
  };

}


