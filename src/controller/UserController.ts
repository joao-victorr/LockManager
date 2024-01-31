import { Request, Response } from 'express';
import { prismaClient } from '../database/PrismaClient';


type User = {
  id: string;
  name: string;
  email: string;
}

export class UserController {

  async create(req: Request, res: Response) {

    const dataUser = {
      name: req.body.name as string,
      email: req.body.email.toLowerCase() as string,
      password: req.body.password as string
    };

    try {
      const newUser = await prismaClient.users.create({
        data: {
          email: dataUser.email,
          name: dataUser.name,
          password: dataUser.password,
        },
      });
  
      return res.status(201).json({ "Cadastro realizado": newUser });
    } catch (err: any) {
      if (err.code === 'P2002' && err.meta?.target?.includes('email')) {
        return res.status(400).json({ "Error": "E-mail já cadastrado." });
      }
      console.error(err);
      return res.status(500).json({ "Error": "Erro interno do servidor." });
    }

  };

  async read(req: Request, res: Response) {

    const dataUser: User = {
      id: req.query.id as string,
      name: req.query.name as string,
      email: req.query.email as string,
    };

    if (dataUser.id) {
      
      const user = await prismaClient.users.findUnique({ where: { id: dataUser.id }})

      return res.json( { user } )

    }

    if (dataUser.name) {
      const user = await prismaClient.users.findMany({
        where: {
          name: {
            contains: dataUser.name
          }
        }
      })
      return res.json( { user } )
    }
    
    if (dataUser.email) {
      const user = await prismaClient.users.findMany({
        where: { email: dataUser.email },
      });
      return res.json( { user } )
    }

    const user = await prismaClient.users.findMany();
    return res.json( { user });

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


