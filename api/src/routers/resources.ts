import { Router, Request, Response } from 'express';
import ResourcesControllers from '../controllers/resources';

const resourcesRouter = Router();

const controller = new ResourcesControllers();

resourcesRouter
.get("/", controller.getMockResources)

export default resourcesRouter;