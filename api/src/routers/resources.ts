import { Router } from 'express';
import ResourcesControllers from '../controllers/resources.js';
import { authenticateToken } from '../middlewares/auth-validator.js';

const resourcesRouter = Router();

const controller = new ResourcesControllers();

resourcesRouter.get('/', authenticateToken, controller.getMockResources)

export default resourcesRouter;