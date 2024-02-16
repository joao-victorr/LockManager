
import { Router } from 'express';
import multer from 'multer';

import { privateRouter } from './middleware/PassportMiddleware'

import { UserWebController } from './controller/UserWebController';
import { UsersController } from './controller/UsersController';
import { LocksController } from './controller/LocksController';
import { LoginController } from './controller/LoginController';
import { GroupsController } from './controller/GroupsController';
import { TimesController } from './controller/TimesController';
 import { AcccessRulesController } from './controller/AcccessRulesController';
import { UsersGroupsController } from './controller/UsersGroupsController';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const loginController = new LoginController;
const userWebController = new UserWebController;
const usersController = new UsersController;
const locksController = new LocksController;
const groupController = new GroupsController;
const timesController = new TimesController;
const accessRulesController = new AcccessRulesController;
const usersGroupsController = new UsersGroupsController;


router.post('/login', loginController.login)

router.post('/user_web', privateRouter, userWebController.create);
router.get('/user_web', privateRouter, userWebController.read);
router.delete('/user_web', privateRouter, userWebController.delete);
router.put('/user_web', privateRouter, userWebController.update);

router.post('/users', privateRouter, upload.single("image"), usersController.create);
router.get('/users', privateRouter, usersController.read);
router.delete('/users', privateRouter, usersController.delete);

router.post('/locks', privateRouter, locksController.create);
router.get('/locks', privateRouter, locksController.read);
router.delete('/locks', privateRouter, locksController.delete);

router.post('/group', privateRouter, groupController.create);
router.get('/group', privateRouter, groupController.read);
router.delete('/group', privateRouter, groupController.delete);

router.post('/times', privateRouter, timesController.create);

router.post('/access_rules', privateRouter, accessRulesController.create);

router.post('/user_group', privateRouter, usersGroupsController.create);

export { router };
