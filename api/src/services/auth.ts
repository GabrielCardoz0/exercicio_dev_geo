import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { UsersService } from './users.js';

dotenv.config();

export class AuthService {

  private readonly usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  private signJwt = (userId: number) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET!)
  }

  private verifyPassword = async ({ password, comparePassword }: { password: string, comparePassword: string }) => {
    return await bcrypt.compare(password, comparePassword);
  }

  private hashPassword = (password: string) => {
    return bcrypt.hashSync(password, 10)
  }

  public login = async ({ email, password }: { email: string, password: string }) => {
    const user = await this.usersService.getByEmailOrFail(email);

    const isValidPassword = await this.verifyPassword({ password, comparePassword: user.password });

    if(!isValidPassword) {
      throw new Error('Senha ou email incorreto.');
    }

    return this.signJwt(user.id);
  }

};
