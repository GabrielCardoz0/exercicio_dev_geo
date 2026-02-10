import { Router } from 'express';
import UsersControllers from '../controllers/users.js';
import { authenticateToken } from '../middlewares/auth-validator.js';

const usersRouter = Router();

const controller = new UsersControllers();

usersRouter.get('/me', authenticateToken, controller.getMe)

export default usersRouter;