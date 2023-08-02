import express from 'express';
import UserController from '../controllers/userControllers';

export const apiRouter = express.Router();

apiRouter.post('/create/user', new UserController().createUser);
