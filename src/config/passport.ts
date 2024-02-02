import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { prismaClient } from '../database/PrismaClient';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

dotenv.config();

const notAuthorizedJson = {
    status: 401,
    mesage: "Não autorizado"
}

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
}

passport.use(new JWTStrategy(options, async (payload, done) => {

    const user = await prismaClient.users.findUnique({
        where: {id: payload}
    })

    if (user) {
        return done(null, user);
    } else {
        return done(notAuthorizedJson, false);
    }
    

}))

export const generateToken = (data: Object) => {
    return jwt.sign(data, process.env.JWT_SECRET as string)
}

export const privateRouter = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("jwt", (_err: Error, user: any) => {
        req.user = user
        return user ? next() : next(notAuthorizedJson)
    })(req, res, next);
};


export default passport;