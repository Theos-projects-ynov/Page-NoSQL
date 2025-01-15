import Form from "../models/Form.js";

const createForm = async (req, res) => {
    try {
        console.log("test Form");
        const { name, authorId, questions } = req.body;

        console.log("authorId : ", authorId);

        const newFormData = {
            name: name,
            authorId: authorId,
            questions: questions || "No questions"
        };

        const newForm = new Form(newFormData);

        await newForm.save();

        res.status(201).send(newForm);
    } catch (error) {
        console.log("error : ", error);
        res.status(400).send('Erreur lors de la création du formulaire');
    }
}

const getAllForms = async (req,res) => {
    try {
        console.log("-getAllForms-")
        const forms = await Form.find({});
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération des utilisateurs');
    }
}

const getOneFormsById = async (req,res) => {
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

const getOneFormsByAuthorId = async (req,res) => {
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
        await Form.deleteMany({});
        res.status(201).send("All forms deleted");
    } catch (error) {
        console.log("error : ", error);
        res.status(400).send('Erreur lors de la création du formulaire');
    }
}

export { createForm,getAllForms,getOneFormsById,getOneFormsByAuthorId,deleteAllForms };
