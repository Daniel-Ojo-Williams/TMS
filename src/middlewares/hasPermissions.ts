import type { NextFunction, Request, Response } from "express";
import { Roles } from "../shared/types/roles";
import { CustomError } from "../utils/customError";
import { HttpStatus } from "../utils/statusCodes";
import Tasks from "../tasks/model/tasks.model";
import { Permissions } from "../utils/seedRoles&Permissions";
import { AuthPayload } from "../shared/types/auth";

export const hasPermission = (permission: Permissions) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    checkPermission(permission, user)
    next();
  } catch (error) {
    next(error);
  }
}

export const checkPermission = (permission: Permissions, user: AuthPayload, task?: Tasks): void => {
    if (user.role === Roles.ADMIN ) return;

    if (user.permissions.includes(permission)) return;

    if (task && user.sub === task.user.id) {
      return;
    }

    throw new CustomError(HttpStatus.FORBIDDEN, 'Access Denied');
}