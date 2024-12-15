import type { Request, Response } from 'express';
import { AuthDevice } from '../DevicesController/LoginDevice';
import { prismaClient } from '../databases/PrismaClient';
import { httpCodeError } from '../helpers/AxiosInstance';
import { ApiError, BadResquestError } from '../helpers/apiErrors';


export class DevicesController {

  async create(req: Request, res: Response) {

    const { name, ip, user, password } = req.body;

    if (!name || !ip || !user || !password) {
      throw new BadResquestError("Data not found!")
    }

    const verifyDevice = await prismaClient.devices.findUnique({ where: { ip } });

    if (verifyDevice) {
      throw new BadResquestError("Device already registered!")
    }

    const authDevice = new AuthDevice(ip, user, password);
    const isAuthenticatedData = await authDevice.login();

    if (!isAuthenticatedData.status) {
      const errorMessage = httpCodeError(isAuthenticatedData.code);
      // console.log(errorMessage, isAuthenticatedData.code, "------------------------------------------------")
      throw new BadResquestError(`${errorMessage}, device returned code: ${isAuthenticatedData.code}`)
    }

    const newDevice = await prismaClient.devices.create({
      data: {
        name,
        ip,
        user,
        password,
        status: isAuthenticatedData.status
      },
    })

    return res.status(201).json( newDevice);

  };

  async read(req: Request, res: Response) {
    const id = req.query.id as string// Verifica se 'id' foi fornecido nos parâmetros

    if (!id) {

      const devices = await prismaClient.devices.findMany();

      return res.status(200).json({ devices });
    }


    // Se 'id' foi fornecido, busca pelo id
    const device = await prismaClient.devices.findUnique({ where: { id } });
    if (!device) {
      throw new ApiError("Device not found", 404);
    }

    return res.status(200).json({ device });

  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {
   
  };

}