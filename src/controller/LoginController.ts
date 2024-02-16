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

    const user = await prismaClient.usersWeb.findUnique({where: {email: dataUser.email}})
    
    if(!user) {
      throw new UnauthorazedError("Email or password not found")  
    }

    const passwordHash = user.password

    const varifyPassword = await bcrypt.compare(dataUser.password, passwordHash)

    if(!varifyPassword) {
      throw new UnauthorazedError("Email or password not found")  
    }

    await loginLock();
    const token = generateToken(user.id);
    return res.status(200).json({success: true, token: token});
  };
}