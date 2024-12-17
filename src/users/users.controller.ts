import type { Request, Response, NextFunction } from "express";
import { LoginUserInput, RegisterUserInput } from "./dto/user-auth.dto";
import UserService from "./users.service";
import { HttpStatus } from "../utils/statusCodes";

class Users {
  async registerUserController (req: Request<{}, {}, RegisterUserInput>, res: Response, next: NextFunction) {
    try {
      const data = await UserService.registerUser(req.body);
      res.status(HttpStatus.CREATED).json({ error: false, message: 'Created user successfully', data });
    } catch (error) {
      next(error);
    }
  }
  
  async loginUser(req: Request<{}, {}, LoginUserInput>, res: Response, next: NextFunction) {
    try {
      const data = await UserService.loginUser(req.body);
      res.status(HttpStatus.OK).json({ error: false, message: 'Logged in successfully', data });
    } catch (error) {
      next(error);
    }
  }
}

export default new Users;
