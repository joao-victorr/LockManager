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

    //VERIFICANDO A EXISTENCA DESSE CEUAR
    if(!user) {
      throw new BadResquestError("User not found");
    }

    //PEGADNODE DO USUARIO
    const userImage = user.image ? await getImage(user.image) : null;

    //PEGADNO DISPOSITRIVOS
    const devices = await Promise.all(
      devicesId.map(async id =>  {
        const device = await prismaClient.devices.findUnique({where: { id }})
  
        if (!device) {
          throw new BadResquestError(`Device not found: ${id}`);
        }
  
        return device;
      })
    )


    // CADASTRADNDO FOTO DE USUARIO.
    const newUserDevices = await devices.map(async device => {
      const Device = new AuthDevice(device.ip, device.user, device.password );

      const session = await Device.login();

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

      const newUserDevice = await userDevice.createUser();

      if (!newUserDevice.ids) {
        console.error(`Erro ao cadastrar UserDevice no device ${device.id} -- ${device.name}`)
        // // Gerar log

        return {userId: user.id, deviceId: device.id, status: false}
      }

      userImage ? await userDevice.setUserImage(userImage, newUserDevice.ids) : null


      console.log({userId: user.id, deviceId: device.id, status: true});
      const res = {userId: user.id, deviceId: device.id, status: true}
      return res
      

    })


    res.status(201).json(newUserDevices)



  };

  async read(req: Request, res: Response) {

  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {

  };

}