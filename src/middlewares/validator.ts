import type { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

interface ParsedRequest {
  body: Request['body'];
  params: Request['params'];
  query: Request['query']
}

export const Validator = (schema: ZodSchema) => (req: Request, _: Response, next: NextFunction) => {
  try {
    const parsedRequest: ParsedRequest = schema.parse({ body: req.body, query: req.query, params: req.params });

    req.body = parsedRequest.body;
    req.params = parsedRequest.params;
    req.query = parsedRequest.query;
    
    next();
  } catch (error) {
    next(error);
  }
}