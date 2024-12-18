import { NextFunction, Request, Response } from "express";
import rolesService from "./roles.service";
import { HttpStatus } from "../utils/statusCodes";
import { NewRoleInput } from "./dto/newRole.dto";
import { AssignRoleInput } from "./dto/assignRole";

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
 
  async createRole(req: Request<{}, {}, NewRoleInput>, res: Response, next: NextFunction) {
    try {
      const data = await rolesService.createRole(req.body);
      res.status(HttpStatus.OK).json({ error: false, message: 'Created role successfully', data })
    } catch (error) {
      next(error);
    }
  }
 
  async updateUserRole(req: Request<{}, {}, AssignRoleInput>, res: Response, next: NextFunction) {
    try {
      await rolesService.updateUserRole(req.body);
      res.status(HttpStatus.OK).json({ error: false, message: 'User role updated successfully' })
    } catch (error) {
      next(error);
    }
  }
}

export default new RolesController;
