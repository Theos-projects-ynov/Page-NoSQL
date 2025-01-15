import express from 'express';
import {
    createForm,
    deleteAllForms,
    getAllForms, getOneFormsByAuthorId, getOneFormsById
} from "../controllers/formController.js";

const formRouter = express.Router();

formRouter.get('/', getAllForms);
formRouter.get('/:id', getOneFormsById);
formRouter.get('/author/:authorid', getOneFormsByAuthorId);
formRouter.post('/', createForm);
formRouter.delete('/deleteAll', deleteAllForms);

export default formRouter;
