import { Response } from 'express';
import { AuthenticatedRequest } from '../interfaces';
import { MarkersService } from '../services/markers';

export default class MarkersControllers {
  private readonly markersService: MarkersService;

  constructor() {
    this.markersService = new MarkersService();
  }

  public get = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const markers = await this.markersService.get(req.user!.id);

      return res.send(markers);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Erro inesperado' })
    }
  }

  public post = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const marker = await this.markersService.create(req.user!, req.body);

      return res.send({ marker });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Erro inesperado' })
    }
  }

  public delete = async (req: AuthenticatedRequest, res: Response) => {
    try {
      await this.markersService.delete(req.user!, Number(req.params.id));

      return res.send({ message: 'Marcador deletado com sucesso!' });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Erro inesperado' })
    }
  }

}