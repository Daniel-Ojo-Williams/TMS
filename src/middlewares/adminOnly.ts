import type { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../utils/statusCodes";
import { CustomError } from "../utils/customError";

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (user.role !== 'admin') {
      throw new CustomError(HttpStatus.FORBIDDEN, 'Access Denied');
    }
    next();
  } catch (error) {
    next(error);
  }
}