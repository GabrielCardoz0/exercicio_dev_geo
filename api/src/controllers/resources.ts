import { Request, Response } from "express";
import { ResourcesService } from "../services/resources";

export default class ResourcesControllers {
  private readonly resourcesService: ResourcesService;

  constructor() {
    this.resourcesService = new ResourcesService();
  }

  public getMockResources = async (req: Request, res: Response) => {
    try {
      const mock = await this.resourcesService.getMockResources();

      return res.send(mock);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: 'Erro inesperado' })
    }
  }
}