import Form from "../models/Form.js";
import Answer from "../models/Answer.js";
import mongoose from "mongoose";
import User from "../models/User.js";

const _isUserExist = async (idUser) => {
    if (!mongoose.Types.ObjectId.isValid(idUser)) {
        console.log("ID utilisateur invalide");
        return false;
    }
    const user = await User.findOne({_id: idUser});
    if (!user) {
        console.log("Utilisateur non trouvé");
        return false;
    }
    return true;
};

const _isFormExist = async (idForm) => {
    if (!mongoose.Types.ObjectId.isValid(idForm)) {
        console.log("ID formulaire invalide");
        return false;
    }
    const form = await Form.findOne({_id: idForm});
    if (!form) {
        console.log("Formulaire non trouvé");
        return false;
    }
    return true;
};

const createForm = async (req, res) => {
    try {
        console.log("Création d'un formulaire");
        const {name, authorId, questions, title, description} = req.body;

        if (!name || !authorId || !title || !description) {
            throw new Error("Les champs obligatoires (name, authorId, title, description) ne sont pas tous renseignés");
        }

        if (!(await _isUserExist(authorId))) {
            throw new Error("L'auteur (authorId) n'existe pas");
        }

        const newFormData = {
            name,
            authorId,
            questions: questions || "No questions",
            title,
            description
        };

        const newForm = new Form(newFormData);
        await newForm.save();

        res.status(201).send(newForm);
    } catch (error) {
        console.log("Erreur lors de la création du formulaire : ", error);
        res.status(400).send('Erreur lors de la création du formulaire : ' + error.message);
    }
};

const getAllForms = async (req, res) => {
    try {
        console.log("- Récupération de tous les formulaires -");
        const forms = await Form.find({});
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération des formulaires');
    }
};

const getOneFormsById = async (req, res) => {
    try {
        console.log("- Récupération d'un formulaire par son identifiant -");
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Identifiant de formulaire invalide");
        }

        const form = await Form.findOne({_id: id});
        if (!form) {
            return res.status(404).send("Formulaire non trouvé");
        }
        res.status(200).json(form);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getFormsByAuthorId = async (req, res) => {
    try {
        console.log("- Récupération des formulaires par identifiant d'auteur -");
        const authorId = req.params.authorid;

        if (!mongoose.Types.ObjectId.isValid(authorId)) {
            throw new Error("Identifiant d'auteur invalide");
        }

        const forms = await Form.find({authorId: authorId});
        if (!forms.length) {
            return res.status(404).send("Aucun formulaire trouvé pour cet auteur");
        }
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteAllForms = async (req, res) => {
    try {
        await Answer.deleteMany({});
        const resultDelete = await Form.deleteMany({});
        res.status(201).send("Tous les formulaires supprimés : " + resultDelete.deletedCount);
    } catch (error) {
        console.log("Erreur lors de la suppression des formulaires : ", error);
        res.status(400).send('Erreur lors de la suppression des formulaires');
    }
};

const deleteOneFormById = async (req, res) => {
    try {
        console.log("- Suppression d'un formulaire par identifiant -");
        const formId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(formId)) {
            throw new Error("Identifiant de formulaire invalide");
        }

        await Answer.deleteMany({formId: formId});
        const resultDelete = await Form.deleteOne({_id: formId});
        if (resultDelete.deletedCount === 0) {
            throw new Error("Aucun formulaire trouvé avec l'identifiant fourni");
        }

        res.status(200).send("Formulaire supprimé avec succès");
    } catch (error) {
        console.log("Erreur lors de la suppression du formulaire : ", error);
        res.status(400).send('Erreur lors de la suppression du formulaire : ' + error.message);
    }
};

const updateForm = async (req, res) => {
    try {
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Identifiant de formulaire invalide");
        }
        const updatedForm = await Form.findByIdAndUpdate(id, req.body, {new: true});
        if (!updatedForm) {
            return res.status(404).json({message: 'Formulaire non trouvé'});
        }
        res.status(200).json(updatedForm);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export {
    createForm,
    getAllForms,
    getOneFormsById,
    getFormsByAuthorId,
    deleteAllForms,
    deleteOneFormById,
    updateForm
};
