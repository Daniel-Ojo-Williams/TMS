import type { Request, Response, NextFunction } from "express";
import { HttpStatus } from "./statusCodes";
import { CustomError } from "./customError";
import { ZodError } from "zod";

export const globalErrorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  let status = HttpStatus.INTERNAL_SERVER_ERROR;
  let message: string = 'Something went wrong';
  let data: unknown;

  if (err instanceof CustomError) {
    message = err.message;
    status = err.statusCode;
    data = err.data;
  }

  if (err instanceof ZodError) {
     message = err.issues.map((err) => `${err.path.pop()}: ${err.message}`).join(', ');
      status = HttpStatus.UNPROCESSABLE_ENTITY;
  }

  res.status(status).json({ error: true, message, data: data ?? null });
}