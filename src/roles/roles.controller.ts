import { NextFunction, Request, Response } from "express";
import rolesService from "./roles.service";
import { HttpStatus } from "../utils/statusCodes";

class RolesController {
  async getAllRoles(_: Request, res: Response, next: NextFunction) {
    try {
      const data = await rolesService.getAllRoles();
      res.status(HttpStatus.OK).json({ error: false, message: 'Fetched all roles successfully', data });
    } catch (error) {
      next(error);
    }
  }
 
  async getAllPermissions(_: Request, res: Response, next: NextFunction) {
    try {
      const data = await rolesService.getAllPermissions();
      res.status(HttpStatus.OK).json({ error: false, message: 'Fetched all roles successfully', data })
    } catch (error) {
      next(error);
    }
  }
}

export default new RolesController;
