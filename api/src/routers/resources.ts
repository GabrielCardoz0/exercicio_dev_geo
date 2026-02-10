import { Router } from 'express';
import ResourcesControllers from '../controllers/resources';
import { authenticateToken } from '../middlewares/auth-validator';

const resourcesRouter = Router();

const controller = new ResourcesControllers();

resourcesRouter.get('/', authenticateToken, controller.getMockResources)

export default resourcesRouter;