import type { Request, Response } from 'express';
import { createAccessRulesDevices } from '../DevicesController/AccessRules/CreateAccessRules';
import { prismaClient } from '../databases/PrismaClient';
import { BadResquestError } from '../helpers/apiErrors';

export class AcccessRulesController {

  async create(req: Request, res: Response) {
  
  };

  async read(req: Request, res: Response) {

  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {

  };

}