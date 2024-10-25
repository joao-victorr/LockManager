import dotenv from 'dotenv';
import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';

import { prismaClient } from '../databases/PrismaClient';
import { UnauthorazedError } from '../helpers/apiErrors';
import type { UserWeb } from '../helpers/types';

dotenv.config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
}

passport.use(new JWTStrategy(options, async (payload, done) => {
    const user = await prismaClient.usersWeb.findUnique({where: {id: payload.user.id}})
    return user ? done(null, user) : done(new UnauthorazedError("Unauthorazed user"), false);
}))

export const privateRouter = (req: Request, res: Response, next: NextFunction) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    passport.authenticate("jwt", (_err: Error, user: any) => {
        const { password: _, ...dataUser } = user
        req.user = dataUser;
        return user ? next() : next(new UnauthorazedError("Unauthorazed user"));
    })(req, res, next);
};

export const generateToken = (data: UserWeb) => {
    return jwt.sign({user: data}, process.env.JWT_SECRET as string, { expiresIn: '5m' })
}

export const verifyToken = (token: string) => {
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET as string) as {user: UserWeb, "iat": number, exp: number}
        return user.user;
    } catch (error) {
        throw new UnauthorazedError("Invalid token!");    
    }
}


export default passport;