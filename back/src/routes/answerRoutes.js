import express from 'express';
import {
    createAnswer,
    getAllAnswer, getOneAnswerByAuthorId,
    getOneAnswerById, getOneAnswerByResponderId
} from "../controllers/answerController.js";

const answerRouter = express.Router();

answerRouter.get('/', getAllAnswer);
answerRouter.get('/:id', getOneAnswerById);
answerRouter.get('/author/:id', getOneAnswerByAuthorId);
answerRouter.get('/responder/:id', getOneAnswerByResponderId);

answerRouter.post('/', createAnswer);

export default answerRouter;
