
import "express-async-errors";
import path from 'node:path';
import cors from "cors";
import dotenv from 'dotenv';
import express, { ErrorRequestHandler, type Request, type Response } from 'express';
import cron from 'node-cron';

import passport from 'passport';
import { BadResquestError, NotFoundError } from "./helpers/apiErrors";
import { ErrorMiddleware } from "./middleware/ErrorMiddleware";
import { router } from './router'

dotenv.config();
const server = express();

server.use(cors())

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static(path.join(__dirname, '../public')));

server.use(passport.initialize());



server.use("/ping", (req: Request, res: Response) => {
    return res.send("Pong")
})

server.use(router)

server.use((req: Request, res: Response) => {
    throw new NotFoundError("Router Not Found")
});


server.use(ErrorMiddleware)

server.listen(process.env.PORT ?? 3000, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});