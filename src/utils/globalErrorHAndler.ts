import type { Request, Response, NextFunction } from "express";
import { HttpStatus } from "./statusCodes";
import { CustomError } from "./customError";

export const globalErrorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  let status = HttpStatus.INTERNAL_SERVER_ERROR;
  let message: string = 'Something went wrong';
  const serverError = (err as Error).message;
  let data: unknown;

  if (err instanceof CustomError) {
    message = err.message;
    status = err.statusCode;
    data = err.data;
  }

  res.status(status).json({ error: true, message, data: data ?? null });
}