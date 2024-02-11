import { Request, Response } from 'express';
import { prismaClient } from '../databases/PrismaClient';
import bcrypt from 'bcrypt';

import { User } from '../helpers/types';
import { BadResquestError } from '../helpers/apiErrors';


export class UserController {

  async create(req: Request, res: Response) {

    const user = {
      name: req.body.name as string,
      email: req.body.email.toLowerCase().trim as string,
      password: req.body.password as string
    };

    if(!user.email || !user.password || !user.name) {
      throw new BadResquestError("Email Already Exists")
    }

    const varifyEmail = await prismaClient.users.findUnique({where: {email: user.email}})

    if(varifyEmail) {
      throw new BadResquestError(("Email exist"))
    }

    user.password = await bcrypt.hash(user.password, 10)

    const newUser = await prismaClient.users.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
      },
    });

    const {password:_, ...userData} = newUser

    return res.status(201).json({ "New User": userData });

  };

  async read(req: Request, res: Response) {

    const dataUser: User = {
      id: req.query.id as string,
      name: req.query.name as string,
      email: req.query.email as string,
    };

    if (dataUser.id) {
      const users = await prismaClient.users.findUnique({ where: { id: dataUser.id }})

      const {password:_, ...usersData} = users
      return res.json( { usersData } )
    }

    if (dataUser.email) {
      const user = await prismaClient.users.findUnique({
        where: { email: dataUser.email.toLowerCase().trim() },
      });

      const {password:_, ...usersData} = user
      return res.json( { usersData } )
    }

    if (dataUser.name) {
      const users = await prismaClient.users.findMany({
        where: {
          name: {
            contains: dataUser.name
          }
        }
      })

      const usersData = users.map((e: any) => {
        const {password:_, ...user} = e
        return user
      })

      return res.json( { usersData } )
    }

    const users = await prismaClient.users.findMany();

    const usersData = users.map((e: any) => {
      const {password:_, ...user} = e
      return user
    })

    return res.json( { usersData } )

  };

  async update(req: Request, res: Response) {
    
    const userId = req.body.id as string;


    const { newName, newEmail, newPassword } = req.body;

  try {
    const existingUser = await prismaClient.users.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const updatedUser = await prismaClient.users.update({
      where: { id: userId },
      data: {
        name: newName || existingUser.name,
        email: newEmail || existingUser.email,
        password: newPassword || existingUser.password,
      },
    });

    return res.json({ message: 'Usuário atualizado com sucesso', user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }

  };

  async delete(req: Request, res: Response) {
    const id = req.body.id as string;

    try {

      const user = await prismaClient.users.delete({
        where: { id },
      });

      return res.json({ "User": user });

    } catch (err: any) {

      if(err.code == 'P2025') {
        return res.json({ "Error": "Registro não encontrado" });
      }

    }
      
  };

}


