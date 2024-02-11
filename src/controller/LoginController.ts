import { Request, Response } from 'express';
import { prismaClient } from '../databases/PrismaClient';
import { generateToken } from '../middleware/PassportMiddleware';
import { loginLock } from '../LockController/LoginLock';

import { BadResquestError, UnauthorazedError } from '../helpers/apiErrors';


export class LoginController {
  async login(req: Request, res: Response) {
    if(!req.body.email && !req.body.password) {
      throw new BadResquestError("Data Not Found")
    }

    const { email, password } = req.body

    const user = await prismaClient.users.findUnique({where: {email}})
    
    if(!user) {
      throw new UnauthorazedError("User or password not found")  
    }

    await loginLock();
    const token = generateToken(user.id);
    return res.status(200).json({success: true, token: token});
  };
}