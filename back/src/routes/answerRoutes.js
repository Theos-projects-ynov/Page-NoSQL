import express from 'express';
import {
    createAnswer,
    getAllAnswer, getOneAnswerByAuthorId, getOneAnswerByFormId,
    getOneAnswerById, getOneAnswerByResponderId
} from "../controllers/answerController.js";
import formRouter from "./formRoutes.js";

const answerRouter = express.Router();

answerRouter.get('/', getAllAnswer);
answerRouter.get('/:id', getOneAnswerById);
answerRouter.get('/author/:id', getOneAnswerByAuthorId);
answerRouter.get('/form/:id', getOneAnswerByFormId);
answerRouter.get('/responder/:id', getOneAnswerByResponderId);

answerRouter.post('/', createAnswer);

export default answerRouter;
