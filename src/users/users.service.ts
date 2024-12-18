import { LoginUserInput, RegisterUserInput } from './dto/user-auth.dto';
import User, { UserModel } from './model/user.model';
import * as bcrypt from 'bcrypt';
import { CustomError } from '../utils/customError';
import { HttpStatus } from '../utils/statusCodes';
import * as jwt from 'jsonwebtoken';
import { AuthPayload } from '../shared/types/auth';
import { Roles } from '../shared/types/roles';

class UserService {
  async registerUser (userDetails: RegisterUserInput): Promise<UserModel> {
    const { email, password, name } = userDetails;
    const userExists = await User.findOne({ where: { email } });
    if (userExists) throw new CustomError(HttpStatus.UNAUTHORISED, 'Account with email already exists');
    const passwordHash = await bcrypt.hash(password, 12);
    const user = (await User.create({ email, password: passwordHash, name, role: Roles.USER })).toJSON();
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
    const payload: AuthPayload = { sub: user.id, email: user.email, role: user.role };
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong'); // TODO: Remove this when i validate env keys
    const token = jwt.sign(payload, secret, { expiresIn: '5h' });
    return { token, user };
  }

  async createFirstAdmin() {
    const defaultAdminEmail = process.env.DEFAULT_ADMIN_EMAIL;
    const defaultAdminPassword = process.env.DEFAULT_ADMIN_PASSWORD;
    const defaultAdminName = process.env.DEFAULT_ADMIN_NAME;
    if (!defaultAdminEmail || !defaultAdminPassword) {
      throw new Error('Please setup default admin email and password'); // TODO: Update this when env is validated
    }
    const firstAdminExists = await User.findOne({ where: { email: defaultAdminEmail } });
    if (!firstAdminExists) {
      const password = await bcrypt.hash(defaultAdminPassword, 12);

      await User.create({ name: defaultAdminName, password, email: defaultAdminEmail, role: Roles.ADMIN })
    }
  }
}

export default new UserService;