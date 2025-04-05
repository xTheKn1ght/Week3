import express from 'express';
import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';
import { authenticateToken } from '../middlewares/middlewares.js';

const userRouter = express.Router();

userRouter.route('/').get(getUser).post(postUser);
userRouter.route('/:id').get(getUserById).put(authenticateToken, putUser).delete(authenticateToken, deleteUser);
userRouter.post('/user', postUser);

export default userRouter;
