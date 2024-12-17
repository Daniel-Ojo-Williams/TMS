import { Router } from "express";
import { LoginUserDto, RegisterUserDto } from "./dto/user-auth.dto";
import { Validator } from "../middlewares/validator";
import usersController from "./users.controller";

const router = Router();

router.post('/api/v1/auth/register', Validator(RegisterUserDto), usersController.registerUserController);
router.post('/api/v1/auth/login', Validator(LoginUserDto), usersController.loginUser);

export default router;
