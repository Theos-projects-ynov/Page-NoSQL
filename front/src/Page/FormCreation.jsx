import React, { useEffect } from 'react';
import QuestionGeneric from "../components/questions/QuestionGeneric";
import { submitForm } from "../service/formService";
import { jwtDecode } from "jwt-decode";

function FormCreation() {
    const [question, setQuestion] = React.useState([]);
    const [decodedToken, setDecodedToken] = React.useState(null);
    const [form, setForm] = React.useState({
        name: "Nom du formulaire",
        title: "Titre", // Titre du formulaire
        description: "LA GROS DESCRIPTION",
        questions: question,
        age: 25,
        email: "test@example.com",
        authorId: 1
    });

    // Fonction pour modifier le titre du formulaire
    const handleTitleChange = (e) => {
        setForm({
            ...form,
            title: e.target.value
        });
    };

    // Fonction pour modifier le titre d'une question
    const handleQuestionTitleChange = (index, e) => {
        const updatedQuestions = [...question];
        updatedQuestions[index].title = e.target.value;  // Modifie le titre de la question spécifique
        setQuestion(updatedQuestions);  // Met à jour les questions
    };

    // Fonction pour modifier le type de la question
    const handleQuestionTypeChange = (index, e) => {
        const updatedQuestions = [...question];
        updatedQuestions[index].type = e.target.value; // Modifie le type de la question
        setQuestion(updatedQuestions); // Met à jour les questions
    };

    const handleAddQuestion = (e) => {
        e.preventDefault();
        setQuestion([
            ...question,
            {
                type: "short",  // Type par défaut
                title: "Nouvelle question",  // Valeur par défaut
                description: "Description",
                required: false
            }
        ]);
    };

    const submit = async (e) => {
        e.preventDefault();
        console.log("Create form");
        const token = localStorage.getItem('token');
        if (token) {
            try {
                form.authorId = jwtDecode(token).id;
                console.log("form.authorId : ", form.authorId);
            } catch (error) {
                console.error("Erreur lors du décodage du token JWT :", error);
            }
        } else {
            return;
        }

        const res = await submitForm(form);
        console.log(res);
    };

    useEffect(() => {
        setForm({
            ...form,
            questions: question
        });
    }, [question]);

    return (
        <div className="form-creation">
            <div className="form-header">
                <label htmlFor="form-title">Form Title:</label>
                <input
                    id="form-title"
                    type="text"
                    value={form.title}
                    onChange={handleTitleChange}
                    placeholder="Enter form title"
                    className="form-title-input"
                />
            </div>

            {question.map((q, index) => (
                <div key={index} className="question-section">
                    <div className="question-title-container">
                        { }
                        <div className="question-type-container">
                            {/* Si le type est déjà défini, on ne montre pas le label */}

                        </div>

                    </div>
                    <QuestionGeneric
                        index={index}
                        question={question}
                        setQuestion={setQuestion}
                    />
                </div>
            ))}

            <button onClick={handleAddQuestion}>Add Question</button>

            <button onClick={submit}>Submit</button>
        </div>
    );
}

export default FormCreation;
