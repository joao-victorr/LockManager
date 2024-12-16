import type { Request, Response } from 'express';
import { prismaClient } from '../databases/PrismaClient';
import { saveImageUser } from '../scripts/SalveImage'; // Função para salvar a imagem

export class UsersController {

  // Método para criar um usuário
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

  // Método para ler dados de usuário (ainda não implementado)
  async read(req: Request, res: Response) {
    // Implementação da leitura
  }

  // Método para atualizar dados de usuário (ainda não implementado)
  async update(req: Request, res: Response) {
    // Implementação da atualização
  }

  // Método para deletar dados de usuário (ainda não implementado)
  async delete(req: Request, res: Response) {
    // Implementação da deleção
  }
}
