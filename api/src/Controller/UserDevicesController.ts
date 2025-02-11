import type { Request, Response } from 'express';
import { AuthDevice } from '../DevicesController/LoginDevice';
import { UserDevice } from '../DevicesController/Users/UserDevices';
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

    //PEGAR A FOTO DO USUARIO
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
      devices.map( async (device) => {
        const authDevice = new AuthDevice(device.ip, device.user, device.password)
        const session = await authDevice.login();
  
        //Verifica se a sessão foi gerada com sucesso. Caso não tenha sido gerada, retorna um objeto com o status igual a falso
        if (!session.session) {
          console.error(`Error in login to device: id: ${device.id} - Name: ${device.name}`);
          // Bloqueio o dispositivo
          // Gera logs
          return { userId: user.id, deviceId: device.id, status: false, image: false }
        }
  
        //Instancia uma nova classe para criação dos usuario nos dispositivos
        const userDevice = new UserDevice(
          {
            id: user.id,
            name: user.name,
            beginTime: user.beginTime,
            endTime: user.endTime,
            password: null
          },
          {
            id: device.id,
            ip: device.ip,
            session: session.session
          }
        )
  
        // Verifica a existencia do usuario no dispositivo
        const isUserInDevice = await userDevice.getUser();
  
  
        // Caso o usuario já esteja casdastrado no dispositivo, verifica se também esta cadastrado no banco de dados, caso não esteja cadastro e retorno a função
        if (isUserInDevice.user) {
          const isUserAssociatedDivice = await prismaClient.usersDevices.findUnique({
            where: {
              idUsers_idDevices: {
                idUsers: user.id,
                idDevices: device.id
              }
            }
          })
  
          //Verifica se existe, se existir retorno true
          if (isUserAssociatedDivice) {
            console.error(`User already associated with device: idUser: ${user.id} - idDevice: ${device.id}`);
            
            return { userId: user.id, deviceId: device.id, status: true, image: true };
          }
  
          const associatedUserInDevice = await prismaClient.usersDevices.create({
            data: {
              idUsers: user.id,
              idDevices: device.id
            }
          })
  
          if (!associatedUserInDevice) {
            console.error(`Error in associate user with device: idUser: ${user.id} - idDevice: ${device.id}`);
            // GERAR LOGS
            return { userId: user.id, deviceId: device.id, status: false, image: false };
          }
  
          return { userId: user.id, deviceId: device.id, status: true, image: true };
  
        }



        // Caso o usuario não esteja cadastrado no dispositivo, verifica se ele está cadastrado no banco de dados, caso não esteja, cadastra e retorno a função
        const userAssociatedDivice = await prismaClient.usersDevices.findUnique({
          where: {
            idUsers_idDevices: {
              idUsers: user.id,
              idDevices: device.id
            }
          }
        }) ?? await prismaClient.usersDevices.create({
          data: {
            idUsers: user.id,
            idDevices: device.id
          }
        })


        if (!userAssociatedDivice) {
          console.error(`Error in associate user with device: idUser: ${user.id} - idDevice: ${device.id}`);
          //Gerar log
          return { userId: user.id, deviceId: device.id, status: false, image: false };
        }

        // Cadastrando o usuario no dispositivo
        const createdUserInDevice = await userDevice.createUser();

        if (!createdUserInDevice.id) {
          console.error(`Error in create user in device: idUser: ${user.id} - idDevice: ${device.id}`);
          // Apagar usuario do banco de dados
          // Gerar logs
          return { userId: user.id, deviceId: device.id, status: false, image: false };
        }


        //cadastrando a foto do usuario
        const isUserImage = userImage ? await userDevice.setUserImage(userImage) : false;

        if (!isUserImage) {
          console.error(`(IMAGE ERROR) Error in set user image in device: idUser: ${user.id} - idDevice: ${device.id}`);
          // Gerar logs
          return { userId: user.id, deviceId: device.id, status: true, image: false };
        }

        if (!isUserImage.status) {
          console.error(`Error in set user image in device: idUser: ${user.id} - idDevice: ${device.id}`);
          // Gerar logs
          return { userId: user.id, deviceId: device.id, status: false, image: false };
        }


        // Logout do dispositivo
        await authDevice.logout(session.session);
  
  
        return { userId: user.id, deviceId: device.id, status: true, image: true }
      })
    )

    return res.status(201).json(newUserDevices)

  };



  // RETORNO OS USUARIOS

  async read(req: Request, res: Response) {

  };


}