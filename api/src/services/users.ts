import prisma from '../config/db';
import dotenv from 'dotenv';

dotenv.config();

export class UsersService {

  public getByIdOrFail = async (id: number) => {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });

    if(!user) throw new Error('Usuário não encontrado.');

    return user;
  }

  public getByEmailOrFail = async (email: string) => {
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    });

    if(!user) throw new Error('Usuário não encontrado.');

    return user;
  }

};
