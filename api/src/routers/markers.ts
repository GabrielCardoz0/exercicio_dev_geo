import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth-validator';
import MarkersControllers from '../controllers/markers';
import Joi from 'joi';
import { IOSMInput } from '../interfaces';
import { validateBody } from '../middlewares/schema-validator';

const markersRouter = Router();

const controller = new MarkersControllers();

const CreateMarkerSchema = Joi.object<IOSMInput>({
  lat: Joi.number().required(),
  lon: Joi.number().required(),
  display_name: Joi.string().optional(),
  place_id: Joi.number().optional(),
  address: Joi.object({
    building: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().optional(),
    postcode: Joi.string().optional()
  }).optional()
})

markersRouter
.use(authenticateToken)
.get('/', controller.get)
.post('/', validateBody(CreateMarkerSchema), controller.post)
.delete('/:id', controller.delete)

export default markersRouter;