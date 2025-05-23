import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import { prismaClient } from '../databases/PrismaClient';

import { generateToken, verifyToken } from '../middleware/PassportMiddleware';

import { BadResquestError, UnauthorazedError } from '../helpers/apiErrors';


export class AuthController {
  async login(req: Request, res: Response) {

    console.log(req.body);

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

    const { password:  _, ...user } = data

    const token = generateToken(user);
    return res.status(200).json({user, token: token});
  };

  async token(req: Request, res: Response) {    
    const userToken = req.query.token as string

    if(!userToken) {
      throw new BadResquestError("Token not found")
    }

    const user = verifyToken(userToken)
    
    return res.json({ user })
  }
}
