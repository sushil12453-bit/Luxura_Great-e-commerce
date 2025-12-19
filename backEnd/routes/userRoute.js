import express from 'express';
import { loginUser,registerUser,adminLogin } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser)  // if we hit the api from server.js the registerUser function gets executed
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)

export default userRouter;