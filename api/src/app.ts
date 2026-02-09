import express from 'express';
import cors from 'cors';
import resourcesRouter from './routers/resources';
import authRouter from './routers/auth';
import usersRouter from './routers/users';
import markersRouter from './routers/markers';

export default express()
.use(express.json())
.use(cors())
.get('/health', (req, res) => res.status(200).send({ status: 200, message: 'server is running' }))
.use('/resources', resourcesRouter)
.use('/auth', authRouter)
.use('/users', usersRouter)
.use('/markers', markersRouter)
;