import type { Request, Response, NextFunction } from 'express';
import { LoginUserInput, RegisterUserInput } from './dto/user-auth.dto';
import User, { UserModel } from './model/user.model';
import * as bcrypt from 'bcrypt';
import { CustomError } from '../utils/customError';
import { HttpStatus } from '../utils/statusCodes';
import * as jwt from 'jsonwebtoken';
import { AuthPayload } from '../types/auth';

class UserService {
  async registerUser (userDetails: RegisterUserInput): Promise<UserModel> {
    const { email, password, name } = userDetails;
    const userExists = await User.findOne({ where: { email } });
    if (userExists) throw new CustomError(HttpStatus.UNAUTHORISED, 'Account with email already exists');
    const passwordHash = await bcrypt.hash(password, 12);
    const user = (await User.create({ email, password: passwordHash, name })).toJSON();
    // @ts-ignore
    delete user.password;
    console.log(user)
    return user;
  }
  
  async loginUser (userDetails: LoginUserInput): Promise<{ token: string; user: UserModel }> {
    const { email, password } = userDetails;
    const user = (await User.findOne({ where: { email } }))?.toJSON();
    if (!user) throw new CustomError(HttpStatus.UNAUTHORISED, 'Invalid credentials');
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new CustomError(HttpStatus.UNAUTHORISED, 'Invalid credentials');
    // @ts-ignore
    delete user.password;
    const payload: AuthPayload = { sub: user.id, email: user.email };
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong'); // TODO: Remove this when i validate env keys
    const token = jwt.sign(payload, secret, { expiresIn: '5h' });
    return { token, user };
  }
}

export default new UserService;