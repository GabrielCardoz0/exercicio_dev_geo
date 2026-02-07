import express from 'express';
import cors from 'cors';
import resourcesRouter from './routers/resources';

export default express()
.use(express.json())
.use(cors())
.get('/health', (req, res) => res.status(200).send({ status: 200, message: 'server is running' }))
.use('/resources', resourcesRouter)
;