
import { Router, Response, Request } from 'express';
import multer from 'multer';



import { UserController } from './controller/UserController';
import { AccesseController } from './controller/AccesseController';
import { LockController } from './controller/LockController';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });


const userController = new UserController
const accessController = new AccesseController
const lockController = new LockController


router.post('/user', userController.create);
router.get('/user', userController.read);
router.delete('/user', userController.delete);
router.put('/user', userController.update);

router.post('/accesse', upload.single("image"), accessController.create);

router .post('/lock', lockController.create);

export { router };