import express from 'express';
import {
    createForm,
    deleteAllForms, deleteOneFormById,
    getAllForms, getFormsByAuthorId, getOneFormsById, updateForm
} from "../controllers/formController.js";
import { getOneAnswerByFormId } from "../controllers/answerController.js";

const formRouter = express.Router();

formRouter.get('/', getAllForms);
formRouter.get('/:id', getOneFormsById);
formRouter.get('/author/:authorid', getFormsByAuthorId);
formRouter.post('/', createForm);
formRouter.delete('/deleteAll', deleteAllForms);
formRouter.delete('/:id', deleteOneFormById);
formRouter.put('/:id', updateForm);


export default formRouter;
