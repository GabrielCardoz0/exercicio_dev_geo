import prisma from '../config/db';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export class AuthService {

  private signJwt = (userId: number) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET!)
  }

  private verifyPassword = async ({ password, comparePassword }: { password: string, comparePassword: string }) => {
    return await bcrypt.compare(password, comparePassword);
  }

  private hashPassword = (password: string) => {
    return bcrypt.hashSync(password, 10)
  }

  private getUserByEmailOrFail = async (email: string) => {
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    });

    if(!user) throw new Error('Usuário não encontrado.');

    return user;
  }

  public login = async ({ email, password }: { email: string, password: string }) => {
    const user = await this.getUserByEmailOrFail(email);

    const isValidPassword = await this.verifyPassword({ password, comparePassword: user.password });

    if(!isValidPassword) {
      throw new Error('Senha ou email incorreto.');
    }

    return this.signJwt(user.id);
  }

};
