
import "express-async-errors";
import express, { ErrorRequestHandler, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from "cors";

import passport from 'passport';
import { router } from './router'
import { ErrorMiddleware } from "./middleware/ErrorMiddleware";
import { BadResquestError } from "./helpers/apiErrors";


dotenv.config();
const server = express();

server.use(cors())

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static(path.join(__dirname, '../public')));

server.use(passport.initialize());

server.use(router)

server.use((req: Request, res: Response) => {
    throw new BadResquestError("Router Not Found")
});

server.use(ErrorMiddleware)

server.listen(process.env.PORT);