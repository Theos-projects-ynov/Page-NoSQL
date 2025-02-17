import Form from "../models/Form.js";
import Answer from "../models/Answer.js";

const createForm = async (req, res) => {
    try {
        console.log("test Form");
        const {name, authorId, questions, title, description} = req.body;

        console.log("authorId : ", authorId);

        const newFormData = {
            name: name,
            authorId: authorId,
            questions: questions || "No questions",
            title: title,
            description: description
        };

        const newForm = new Form(newFormData);

        await newForm.save();

        res.status(201).send(newForm);
    } catch (error) {
        console.log("error : ", error);
        res.status(400).send('Erreur lors de la création du formulaire');
    }
}

const getAllForms = async (req, res) => {
    try {
        console.log("-getAllForms-")
        const forms = await Form.find({});
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération des utilisateurs');
    }
}

const getOneFormsById = async (req, res) => {
    try {
        console.log("-get One Form By Id-")
        console.log("req.params : ", req.params);
        const Id = req.params.id;
        console.log("Id : ", Id);

        if (Id === undefined) {
            throw new Error("Id undefined");
        }

        const forms = await Form.findOne({_id: Id});
        console.log("forms : ", forms);

        res.status(200).json(forms);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getOneFormsByAuthorId = async (req, res) => {
    try {
        console.log("-get One Form By Author Id-")
        console.log("req.params : ", req.params);
        const authorId = req.params.authorid;
        console.log("authorId : ", authorId);

        if (authorId === undefined) {
            throw new Error("Id undefined");
        }

        const forms = await Form.findOne({authorId: authorId});
        console.log("forms : ", forms);

        res.status(200).json(forms);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteAllForms = async (req, res) => {
    try {
        await Answer.deleteMany({});
        const resultDelte = await Form.deleteMany({});
        res.status(201).send("All forms deleted : " + resultDelte.deletedCount);
    } catch (error) {
        console.log("error : ", error);
        res.status(400).send('Erreur lors de la création du formulaire');
    }
}

const deleteOneFormById = async (req, res) => {
    try {
        console.log("-delete One Form By Id-");
        console.log("req.params : ", req.params);
        const formId = req.params.id;
        console.log("formId : ", formId);

        if (formId === undefined) {
            throw new Error("Id undefined");
        }

        await Answer.deleteMany({formId: formId});
        const resultDelete = await Form.deleteOne({_id: formId});
        console.log("resultDelete : ", resultDelete);

        if (resultDelete.deletedCount === 0) {
            throw new Error("No form found with the provided ID");
        }

        res.status(200).send("Form deleted successfully");
    } catch (error) {
        console.log("error : ", error);
        res.status(400).send('Error deleting the form: ' + error.message);
    }
}

export {
    createForm,
    getAllForms,
    getOneFormsById,
    getOneFormsByAuthorId,
    deleteAllForms,
    deleteOneFormById
};
