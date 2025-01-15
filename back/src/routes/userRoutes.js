import express from 'express';
import {
    createUser,
    getAllUser,
    login
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/', getAllUser);
userRouter.post('/', createUser);
userRouter.post('/login', login);

export default userRouter;

//

