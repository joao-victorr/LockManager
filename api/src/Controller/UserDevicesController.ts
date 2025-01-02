import type { Request, Response } from 'express';
import { AuthDevice } from '../DevicesController/LoginDevice';
import { UserDevice } from '../DevicesController/Users/CreateUserDevices';
import { prismaClient } from '../databases/PrismaClient';
import { ApiError, BadResquestError } from '../helpers/apiErrors';
import { getImage } from '../scripts/SalveImage';

export class UserDevicesController {

  async create(req: Request, res: Response) {
    // RECEBENDO DADOS
    const userId = req.body.userId;
    const devicesId: Array<string> = req.body.devicesId;

    //PROPCURADNO USUARIO NO BANCO DE DADOS
    const user = await prismaClient.users.findUnique({
      where: { id: userId }
    })

    //VERIFICANDO A EXISTENCA DESSE USUARIO 
    if(!user) {
      throw new BadResquestError("User not found");
    }

    //PEGAR ID DO USUARIO
    const userImage = user.image ? await getImage(user.image) : null;

    //PEGANDO DADOS DOS DISPOSITIVOS
    const devices = await Promise.all(
      devicesId.map(async id =>  {
        const device = await prismaClient.devices.findUnique({where: { id }})
  
        if (!device) {
          throw new BadResquestError(`Device not found: ${id}`);
        }
  
        return device;
      })
    )


    // CADASTRANDO USUARIO NO DISPOSITIVO
    const newUserDevices = await Promise.all(
      devices.map(async device => {

        // Verifica se o dispositivo já possui o usuario cadastrado
        const userInDevice = await prismaClient.usersDevices.findFirst({
          where: {
            idUsers: user.id,
            idDevices: device.id,
          }
        })

        // Se o dispositivo já possui o usuario cadastrado, retorna true para esse dispositivo
        if (userInDevice) {
          // console.error(`Usuario ja cadastrado no device ${device.id} -- ${device.name}`)
          // // Gerar log
          return { userId: user.id, deviceId: device.id, status: true }
        }


        // Cadastra o usuario no dispositivo no banco local
        const createUserInDevice = await prismaClient.usersDevices.create({
          data: {
            idDevices: device.id,
            idUsers: user.id,
          }
        })
        
        if (!userInDevice) {
          console.error(`Erro ao cadastrar UserDevice no device ${device.id} -- ${device.name}`)
          // // Gerar log
          return {userId: user.id, deviceId: device.id, status: false}
        }


        // Instancia um novo dispositivo
        const Device = new AuthDevice(device.ip, device.user, device.password );
  
        const session = await Device.login();
  
        // Verifique se o dispositivo esta acessivel e se conseguiu realizar o login, caso não tenha conseguido, retorna o status como false e gera um log e segue para o proximo cadastro
        if (!session.session) {
          console.error(`Erro ao realizar logon no device ${device.id} -- ${device.name}`)
          // // Gerar log
  
          // Atualliza o Status do dispositivo
          await prismaClient.devices.update({
            where: { id: device.id },
            data: { status: false }
          })
          return {userId: user.id, deviceId: device.id, status: false}
        }
  
        // Instancia um novo usuario
        const userDevice = new UserDevice({
          id: user.id,
          name: user.name,
          beginTime: user.beginTime,
          endTime: user.endTime,
          registration: user.id,
        }, {
          id: device.id,
          ip: device.ip,
          session: session.session
        })

        //Cadastra o novo usuario
        const newUserDevice = await userDevice.createUser();
  
        // Verifica se o cadastro foi bem sucedido, caso não tenha conseguido, retorna o status como false e gera um log e segue para o proximo cadastro
        if (!newUserDevice.ids) {
          console.error(`Erro ao cadastrar UserDevice no device ${device.id} -- ${device.name}`)

          // Apagando usuario do banco de dados local
          await prismaClient.usersDevices.delete({
            where: {
              id: createUserInDevice.id
            }
          })

          // // Gerar log
  
          return {userId: user.id, deviceId: device.id, status: false}
        }
  
        //Caso o usuario tenha uma imagem realiza o cadastro.
        userImage ? await userDevice.setUserImage(userImage, newUserDevice.ids) : null

        // Retorno os dados cadastrados
        const res = {userId: user.id, deviceId: device.id, status: true}
        return res
        
  
      })
    )


    res.status(201).json(newUserDevices)

  };

  async read(req: Request, res: Response) {

  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {

  };

}