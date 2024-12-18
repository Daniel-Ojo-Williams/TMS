import type { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customError";
import { HttpStatus } from "../utils/statusCodes";
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { AuthPayload } from "../types/auth";

export const EnsureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new CustomError(HttpStatus.UNAUTHORISED, 'You are not authenticated. Please login to continue');

    const [type, token] = authHeader.split(' ') || [];

    if (type !== 'Bearer') throw new CustomError(HttpStatus.UNAUTHORISED, 'Invalid authentication');

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR, 'Auth secret not setup');
        const user = jwt.verify(token, secret) as AuthPayload;
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};