import { Router } from 'express';
import AuthControllers from '../controllers/auth.js';
import Joi from 'joi';
import { validateBody } from '../middlewares/schema-validator.js';

const authRouter = Router();

const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(1).required(),
});

const controller = new AuthControllers();

authRouter.post('/login', validateBody(LoginSchema), controller.login)

export default authRouter;