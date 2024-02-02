
import { Router, Response, Request } from 'express';
import multer from 'multer';

import { privateRouter } from './config/passport'

import { UserController } from './controller/UserController';
import { AccesseController } from './controller/AccesseController';
import { LockController } from './controller/LockController';
import { LoginController } from './controller/LoginController';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const loginController = new LoginController
const userController = new UserController
const accessController = new AccesseController
const lockController = new LockController




router.post('/login', loginController.login)

router.post('/user', privateRouter, userController.create);
router.get('/user', privateRouter, userController.read);
router.delete('/user', privateRouter, userController.delete);
router.put('/user', privateRouter, userController.update);

router.post('/accesse', privateRouter, upload.single("image"), accessController.create);

router.post('/lock', privateRouter, lockController.create);

export { router };