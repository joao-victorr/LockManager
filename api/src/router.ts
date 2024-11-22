
import { Router } from 'express';
import multer from 'multer';

import { privateRouter } from './middleware/PassportMiddleware'

import { AcccessRulesController } from './Controller/AcccessRulesController';
import { AuthController } from './Controller/AuthController';
import { DevicesController } from './Controller/DevicesController';
import { DevicesGroupsController } from './Controller/DevicesGroupsController';
import { GroupsController } from './Controller/GroupsController';
import { TimesController } from './Controller/TimesController';
import { UserWebController } from './Controller/UserWebController';
import { UsersController } from './Controller/UsersController';
import { UsersGroupsController } from './Controller/UsersGroupsController';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const authController = new AuthController;
const userWebController = new UserWebController;
// const usersController = new UsersController;
// const devicesController = new DevicesController;
// const groupController = new GroupsController;
// const timesController = new TimesController;
// const accessRulesController = new AcccessRulesController;
// const usersGroupsController = new UsersGroupsController;
// const groupsDevicesController = new DevicesGroupsController;

router.post('/login', authController.login)
router.get('/token', authController.token)

router.post('/user_web', userWebController.create);
router.get('/user_web', privateRouter, userWebController.read);
router.delete('/user_web', privateRouter, userWebController.delete);
router.put('/user_web', privateRouter, userWebController.update);

// router.post('/users', privateRouter, upload.single("image"), usersController.create);
// router.get('/users', privateRouter, usersController.read);
// router.delete('/users', privateRouter, usersController.delete);

// router.post('/device', privateRouter, devicesController.create);
// router.get('/device', privateRouter, devicesController.read);
// router.delete('/device', privateRouter, devicesController.delete);

// router.post('/group', privateRouter, groupController.create);
// router.get('/group', privateRouter, groupController.read);
// router.delete('/group', privateRouter, groupController.delete);

// router.post('/devices_groups', privateRouter, groupsDevicesController.create);
// router.get('/devices_groups', privateRouter, groupsDevicesController.read);
// router.delete('/devices_groups', privateRouter, groupsDevicesController.delete);

// router.post('/user_group', privateRouter, usersGroupsController.create);

// router.post('/times', privateRouter, timesController.create);

// router.post('/access_rules', privateRouter, accessRulesController.create);



export { router };
