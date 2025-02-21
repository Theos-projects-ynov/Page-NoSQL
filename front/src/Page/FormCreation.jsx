import React, { useEffect, useState } from 'react';
import QuestionGeneric from "../components/questions/QuestionGeneric";
import { submitForm, updateForm } from "./formService";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function FormCreation({ initialForm }) {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: initialForm?.name || "Nom du formulaire",
        title: initialForm?.title || "Titre",
        description: initialForm?.description || "yy",
        questions: initialForm?.questions || [],
        authorId: initialForm?.authorId || 1
    });

    useEffect(() => {
        console.log("Chargement initial du formulaire");
        if (initialForm) {
            console.log("Données du formulaire récupérées :", initialForm);
            setForm(prevForm => ({
                ...prevForm,
                ...initialForm,
                questions: Array.isArray(initialForm.questions) ? initialForm.questions : []
            }));
        }
    }, [initialForm]);

    useEffect(() => {
        console.log("État actuel du formulaire :", form);
    }, [form]);

    const handleTitleChange = (e) => {
        setForm(prevForm => ({ ...prevForm, title: e.target.value }));
    };

    const handleAddQuestion = () => {
        setForm(prevForm => {
            const newQuestion = {
                type: "short_question",
                title: "Nouvelle question",
                description: "Description",
                required: false
            };
            const updatedQuestions = [...prevForm.questions, newQuestion];
            console.log("Ajout d'une nouvelle question", updatedQuestions);
            return { ...prevForm, questions: updatedQuestions };
        });
    };

    const handleQuestionChange = (index, updatedQuestion) => {
        setForm(prevForm => {
            if (!prevForm.questions || !prevForm.questions[index]) {
                console.error(`Tentative de mise à jour d'une question inexistante à l'index ${index}`);
                return prevForm;
            }
            const newQuestions = [...prevForm.questions];
            newQuestions[index] = { ...updatedQuestion };
            console.log(`Mise à jour de la question à l'index ${index}`, newQuestions);
            return { ...prevForm, questions: newQuestions };
        });
    };

    const submit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (token) {
            try {
                form.authorId = jwtDecode(token).id;
            } catch (error) {
                console.error("Erreur lors du décodage du token JWT :", error);
            }
        } else {
            console.warn("Aucun token trouvé, soumission annulée");
            return;
        }

        try {
            if (initialForm) {
                await updateForm(initialForm._id, form);
                console.log("Formulaire mis à jour avec succès");
            } else {
                await submitForm(form);
                console.log("Nouveau formulaire créé avec succès");
            }
            navigate("/");
        } catch (error) {
            console.error("Erreur lors de la soumission du formulaire :", error);
        }
    };

    return (
        <div className="form-creation">
            <h1>{initialForm ? "Modifier le formulaire" : "Créer un formulaire"}</h1>
            <input
                type="text"
                value={form.title}
                onChange={handleTitleChange}
                placeholder="Titre du formulaire"
            />
            {form.questions.length > 0 ? (
                form.questions.map((q, index) => (
                    <QuestionGeneric
                        key={index}
                        index={index}
                        question={q}
                        onChange={(updatedQuestion) => handleQuestionChange(index, updatedQuestion)}
                    />
                ))
            ) : (
                <p>Aucune question pour le moment.</p>
            )}
            <button onClick={handleAddQuestion}>Ajouter une question</button>
            <button onClick={submit}>{initialForm ? "Mettre à jour" : "Créer"}</button>
        </div>
    );
}

export default FormCreation;