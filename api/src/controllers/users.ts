import { Response } from 'express';
import { UsersService } from '../services/users.js';
import { AuthenticatedRequest } from '../interfaces/index.js';

export default class UsersControllers {
  private readonly usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  public getMe = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const user = await this.usersService.getByIdOrFail(req.user!.id);

      return res.send(user);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: 'Erro inesperado' })
    }
  }
}