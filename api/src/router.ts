
import { Router } from 'express';
import multer from 'multer';

import { privateRouter } from './middleware/PassportMiddleware'

import { AcccessRulesController } from './Controller/AcccessRulesController';
import { AuthController } from './Controller/AuthController';
import { GroupsController } from './Controller/GroupsController';
import { LocksController } from './Controller/LocksController';
import { LocksGroupsController } from './Controller/LocksGroupsController';
import { TimesController } from './Controller/TimesController';
 import { UserWebController } from './Controller/UserWebController';
import { UsersController } from './Controller/UsersController';
import { UsersGroupsController } from './Controller/UsersGroupsController';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const authController = new AuthController;
const userWebController = new UserWebController;
const usersController = new UsersController;
const locksController = new LocksController;
const groupController = new GroupsController;
const timesController = new TimesController;
const accessRulesController = new AcccessRulesController;
const usersGroupsController = new UsersGroupsController;
const groupsLocksController = new LocksGroupsController;

router.post('/login', authController.login)
router.get('/token', authController.token)

router.post('/user_web', userWebController.create);
router.get('/user_web', privateRouter, userWebController.read);
router.delete('/user_web', privateRouter, userWebController.delete);
router.put('/user_web', privateRouter, userWebController.update);

router.post('/users', privateRouter, upload.single("image"), usersController.create);
router.get('/users', privateRouter, usersController.read);
router.delete('/users', privateRouter, usersController.delete);

router.post('/device', privateRouter, locksController.create);
router.get('/device', privateRouter, locksController.read);
router.delete('/device', privateRouter, locksController.delete);

router.post('/group', privateRouter, groupController.create);
router.get('/group', privateRouter, groupController.read);
router.delete('/group', privateRouter, groupController.delete);

router.post('/devices_groups', privateRouter, groupsLocksController.create);
router.get('/devices_groups', privateRouter, groupsLocksController.read);
router.delete('/devices_groups', privateRouter, groupsLocksController.delete);




router.post('/times', privateRouter, timesController.create);

router.post('/access_rules', privateRouter, accessRulesController.create);

router.post('/user_group', privateRouter, usersGroupsController.create);

export { router };
