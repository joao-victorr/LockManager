import { Request, Response } from 'express';
import { prismaClient } from '../database/PrismaClient';
import { generateToken } from '../config/passport';
import { loginLock } from '../scripts/loginLock';


export class LoginController {

    async login(req: Request, res: Response) {

        if(req.body.email && req.body.password) {
          const email = req.body.email as string;
          const password = req.body.password as string;

          const user = await prismaClient.users.findUnique({
            where: { email: email, password: password}
          })

          if(user) {
            loginLock();
            const token = generateToken(user.id);
            return res.status(200).json({success: true, token: token});

          } else {
            return res.status(401).json({success: false});
          }

        } else {
          return res.status(400).json({err: "Data not found"});
        }
      };


}