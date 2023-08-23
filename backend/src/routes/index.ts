import express from 'express';
import UserController from '../controllers/userControllers';
import authenticate from './middlewares/authenticate';

export const apiRouter = express.Router();

apiRouter.post('/create/user', new UserController().createUser);
apiRouter.post('/login', new UserController().authenticateUser);
apiRouter.get('/users', authenticate, new UserController().index);

export default apiRouter;