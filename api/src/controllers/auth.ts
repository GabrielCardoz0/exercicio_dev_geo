import { Request, Response } from 'express';
import { AuthService } from '../services/auth';

export default class AuthControllers {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public login = async (req: Request, res: Response) => {
    try {
      const token = await this.authService.login(req.body);

      return res.send({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Erro inesperado' })
    }
  }
}