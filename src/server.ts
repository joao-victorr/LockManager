
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';

import { router } from './router'

dotenv.config();
const server = express();


server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static(path.join(__dirname, '../public')));


server.use(router)

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});








server.listen(process.env.PORT);