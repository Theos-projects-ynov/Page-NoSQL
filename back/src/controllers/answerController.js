import Form from "../models/Form.js";
import Answer from "../models/Answer.js";

const createAnswer = async (req,res) => {
    try {
        console.log("createAnswer");
        const {responderId, auhtorFormId, formId, questions} = req.body;
        const newAnswer = new Answer({responderId, auhtorFormId, formId, questions});
        await newAnswer.save();
        res.status(201).json(newAnswer);
    }catch (error) {
        res.status(409).json({message: error.message});
    }
}

const getAllAnswer = async (req,res) => {
    try {
        const answer = await Answer.find({});
        res.status(200).json(answer);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const getOneAnswerById = async (req,res) => {
    try {
        console.log("params: ",req.params);
        const id = req.params.id;
        console.log("Answer id : ",id);
        const answer = await Answer.findOne({_id: id},{},{});
        res.status(200).json(answer);
    }catch (error) {
        res.status(404).json({message: error.message});
    }
}

const getOneAnswerByAuthorId = async (req,res) => {
    try {
        console.log("params: ",req.params);
        const id = req.params.id;
        console.log("Answer id : ",id);
        const answer = await Answer.findOne({auhtorFormId: id},{},{});
        res.status(200).json(answer);
    }catch (error) {
        res.status(404).json({message: error.message});
    }
}

const getOneAnswerByResponderId = async (req,res) => {
    try {
        console.log("getOneAnswerByResponderId : ",req.params);
        const id = req.params.id;
        console.log("Answer id : ",id);
        const answer = await Answer.findOne({responderId: id},{},{});
        res.status(200).json(answer);
    }catch (error) {
        res.status(404).json({message: error.message});
    }
}

export { createAnswer,getAllAnswer,getOneAnswerById, getOneAnswerByAuthorId,getOneAnswerByResponderId };
