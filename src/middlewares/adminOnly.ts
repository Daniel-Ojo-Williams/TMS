import type { NextFunction, Request, Response } from "express";
import { Roles } from "../shared/types/roles";
import { HttpStatus } from "../utils/statusCodes";
import { CustomError } from "../utils/customError";

export const AdminOnly = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (user.role !== Roles.ADMIN) {
      throw new CustomError(HttpStatus.FORBIDDEN, 'Access Denied');
    }
    next();
  } catch (error) {
    next(error);
  }
}