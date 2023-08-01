import express from 'express';
import { addUser, createSession } from '../controllers/userControllers';
import { authenticate } from './middlewares/authenticate';




export const apiRouter = express.Router();


