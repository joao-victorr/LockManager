import path from 'path';
import type { Request, Response } from 'express';
import { prismaClient } from '../databases/PrismaClient';
import { BadResquestError } from '../helpers/apiErrors';
import { getImage, saveImageUser } from '../scripts/SalveImage'; // Função para salvar a imagem

export class UsersController {

  
  async create(req: Request, res: Response) {
    const image = req.file?.buffer; // Obtém a imagem do corpo da requisição (arquivo)
    const name = req.body.name; // Obtém o nome do corpo da requisição

    if (!name) {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }

    const newUser = await prismaClient.users.create({
      data: {
        name,
        image: null 
      },
    })


    if (!image) {
      return res.status(201).json( newUser );
    }


    const imageName = await saveImageUser(image, newUser.id);

    const user = await prismaClient.users.update({
      where: { id: newUser.id },
      data: { image: imageName },
    });


    return res.status(201).json( user );
    
  }

  
  async read(req: Request, res: Response) {
    
    const allUsers = await prismaClient.users.findMany({
      include: {
        _count: {
          select: {
            usersGroups: true,
            usersDevices: true
          }
        }
      }
    });

    return res.json(allUsers).status(200)

  }

 
  async update(req: Request, res: Response) {
    
  }

  async delete(req: Request, res: Response) {
    
  }

  async readImages(req: Request, res: Response) {

    const imageName = req.query.name;

    if (!imageName) {
      throw new BadResquestError("Image name is requeri")
    }

    const verifyImageName = await prismaClient.users.findUnique({
      where: {
        image: imageName as string
      },
      select: {
        image: true
      }
    })

    if (!verifyImageName?.image) {
      throw new BadResquestError("Image not found")
    }

    const imagePath = path.resolve(__dirname, `../../images/${verifyImageName.image}`);

    res.sendFile(imagePath);


  }
}




/*

Esta rota permite realizar o cadastro do usuario sem associa-lo a um equipamento, sendo poossivel cadastrar com ou sem foto, para que seja feita a associação em outra função.


*/