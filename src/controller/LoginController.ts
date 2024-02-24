import { Request, Response } from 'express';
import { prismaClient } from '../databases/PrismaClient';
import bcrypt from 'bcrypt';

import { generateToken } from '../middleware/PassportMiddleware';
import { loginLock } from '../LockController/LoginLock';

import { BadResquestError, UnauthorazedError } from '../helpers/apiErrors';


export class LoginController {
  async login(req: Request, res: Response) {
    if(!req.body.email && !req.body.password) {
      throw new BadResquestError("Data Not Found")
    }

    const dataUser = {
      email: req.body.email as string,
      password: req.body.password as string
    }

    const data = await prismaClient.usersWeb.findUnique({where: {email: dataUser.email}})
    
    if(!data) {
      throw new UnauthorazedError("Email or password not found")  
    }

    const varifyPassword = await bcrypt.compare(dataUser.password, data.password)

    if(!varifyPassword) {
      throw new UnauthorazedError("Email or password not found")  
    }

    const { password: _, ...user } = data

    await loginLock();
    const token = generateToken(user.id);
    return res.status(200).json({user, token: token});
  };
}