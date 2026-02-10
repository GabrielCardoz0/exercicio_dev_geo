import express from 'express';
import cors from 'cors';
import resourcesRouter from './routers/resources.js';
import authRouter from './routers/auth.js';
import usersRouter from './routers/users.js';
import markersRouter from './routers/markers.js';

export default express()
.use(express.json())
.use(cors())
.get('/health', (req, res) => res.status(200).send({ status: 200, message: 'server is running' }))
.use('/resources', resourcesRouter)
.use('/auth', authRouter)
.use('/users', usersRouter)
.use('/markers', markersRouter)
;