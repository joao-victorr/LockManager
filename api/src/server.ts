
import "express-async-errors";
import path from 'node:path';
import cors from "cors";
import dotenv from 'dotenv';
import express, { ErrorRequestHandler, type Request, type Response } from 'express';
import cron from 'node-cron';

import passport from 'passport';
import { BadResquestError } from "./helpers/apiErrors";
import { ErrorMiddleware } from "./middleware/ErrorMiddleware";
import { router } from './router'
import { updateDateTime } from "./scripts/dataAndHors";


dotenv.config();
const server = express();

server.use(cors())

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static(path.join(__dirname, '../public')));

server.use(passport.initialize());

server.use(router)

server.use("/", (req: Request, res: Response) => {
    res.send("Hello World")
})

server.use((req: Request, res: Response) => {
    throw new BadResquestError("Router Not Found")
});

// cron.schedule('0 4 * * *', () => {
//     updateDateTime();
// });

server.use(ErrorMiddleware)

server.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
    // updateDateTime()
});