
import { Router, Response, Request } from 'express';
import multer from 'multer';

import { privateRouter } from './middleware/PassportMiddleware'

import { UserController } from './controller/UserController';
import { AccesseController } from './controller/AccesseController';
import { LockController } from './controller/LockController';
import { LoginController } from './controller/LoginController';
import { DepartmentController } from './controller/DepartmentController';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const loginController = new LoginController;
const userController = new UserController;
const accessController = new AccesseController;
const lockController = new LockController;
const departmentController = new DepartmentController;


router.post('/login', loginController.login)

router.post('/user', privateRouter, userController.create);
router.get('/user', privateRouter, userController.read);
router.delete('/user', privateRouter, userController.delete);
router.put('/user', privateRouter, userController.update);

router.post('/access', privateRouter, upload.single("image"), accessController.create);
router.get('/access', privateRouter, accessController.read);
router.delete('/access', privateRouter, accessController.delete);

router.post('/lock', privateRouter, lockController.create);
router.get('/lock', privateRouter, lockController.read);
router.delete('/lock', privateRouter, lockController.delete);

router.post('/department', privateRouter, departmentController.create);
router.get('/department', privateRouter, departmentController.read);
router.delete('/department', privateRouter, departmentController.delete);




export { router };
