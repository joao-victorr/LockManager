
import express, { ErrorRequestHandler, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import passport from 'passport';

import { router } from './router'

dotenv.config();
const server = express();


server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static(path.join(__dirname, '../public')));

server.use(passport.initialize());

server.use(router)

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

    if(err.status) {
        res.status(err.status)
    } else {
        res.status(400)
    }

    if(err.mesage) {
        res.json({ mesage: err.mesage})
    } else {
        res.json({err: "Ocorreu algum erro"})
    }
}

server.use(errorHandler);




server.listen(process.env.PORT);