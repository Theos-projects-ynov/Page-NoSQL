import Form from "../models/Form.js";
import Answer from "../models/Answer.js";
import User from "../models/User.js";
import mongoose from "mongoose";

const createAnswer = async (req, res) => {
    try {
        console.log("createAnswer");
        const {responderId, auhtorFormId, formId, questions} = req.body;

        if (responderId === undefined || auhtorFormId === undefined || formId === undefined || questions === undefined) {
            throw new Error("responderId or auhtorFormId or formId or questions undefined");
        }

        if (await _isUserExist(responderId) === false) throw new Error("responderId not exist");
        if (await _isUserExist(auhtorFormId) === false) throw new Error("auhtorFormId not exist");
        if (await _isFormExist(formId) === false) throw new Error("formId not exist");

        console.log('passed test');

        const newAnswer = new Answer({
            responderId,
            auhtorFormId,
            formId,
            questions
        });
        await newAnswer.save();
        res.status(201).json(newAnswer);
    } catch (error) {
        console.log(error);
        res.status(409).json({message: error.message});
    }
}

const getAllAnswer = async (req, res) => {
    try {
        const answer = await Answer.find({});
        res.status(200).json(answer);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const getOneAnswerById = async (req, res) => {
    try {
        console.log("params: ", req.params);
        const id = req.params.id;
        console.log("Answer id : ", id);
        const answer = await Answer.findOne({_id: id}, {}, {});
        res.status(200).json(answer);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const getOneAnswerByAuthorId = async (req, res) => {
    try {
        console.log("params: ", req.params);
        const id = req.params.id;
        console.log("Answer id : ", id);
        const answer = await Answer.findOne({auhtorFormId: id}, {}, {});
        res.status(200).json(answer);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const getOneAnswerByResponderId = async (req, res) => {
    try {
        console.log("getOneAnswerByResponderId : ", req.params);
        const id = req.params.id;
        console.log("Answer id : ", id);
        const answer = await Answer.findOne({responderId: id}, {}, {});
        res.status(200).json(answer);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const _isUserExist = async (idUser) => {
    console.log("fonction");
    console.log("idUser : ", idUser);

    if (!mongoose.Types.ObjectId.isValid(idUser)) {
        console.log("ID invalide");
        return false;
    }

    const user = await User.findOne({_id: new mongoose.Types.ObjectId(idUser)});

    if (user === null) {
        console.log("user not exist");
        return false;
    }
    return true;
};

const _isFormExist = async (idForm) => {
    console.log("fonction");
    console.log("idForm : ", idForm);

    if (!mongoose.Types.ObjectId.isValid(idForm)) {
        console.log("ID invalide");
        return false;
    }

    const form = await Form.findOne({_id: new mongoose.Types.ObjectId(idForm)});

    if (form === null) {
        console.log("form not exist");
        return false;
    }
    return true;
}

export {
    createAnswer,
    getAllAnswer,
    getOneAnswerById,
    getOneAnswerByAuthorId,
    getOneAnswerByResponderId
};
