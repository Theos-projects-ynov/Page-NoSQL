import React, { useEffect } from 'react';
import QuestionGeneric from "../components/questions/QuestionGeneric";
import { submitForm } from "../service/formService";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";  // Importation du hook useNavigate

function FormCreation() {
    const [question, setQuestion] = React.useState([]);
    const [decodedToken, setDecodedToken] = React.useState(null);
    const [form, setForm] = React.useState({
        name: "Nom du formulaire",
        title: "Titre", 
        description: "LA GROS DESCRIPTION",
        questions: question,
        age: 25,
        email: "test@example.com",
        authorId: 1
    });

    const navigate = useNavigate();  // Déclare le hook navigate pour la redirection

    const handleTitleChange = (e) => {
        setForm({
            ...form,
            title: e.target.value
        });
    };

    const handleQuestionTitleChange = (index, e) => {
        const updatedQuestions = [...question];
        updatedQuestions[index].title = e.target.value;
        setQuestion(updatedQuestions);
    };

    const handleQuestionTypeChange = (index, e) => {
        const updatedQuestions = [...question];
        updatedQuestions[index].type = e.target.value;
        setQuestion(updatedQuestions);
    };

    const handleAddQuestion = (e) => {
        e.preventDefault();
        setQuestion([
            ...question,
            {
                type: "short",  
                title: "Nouvelle question",  
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

        try {
            const res = await submitForm(form);
            console.log(res);

            // Redirige l'utilisateur vers la page principale après la soumission réussie
            navigate("/");  // Redirection vers la page principale (ou la page que tu souhaites)
        } catch (error) {
            console.error("Erreur lors de la soumission du formulaire :", error);
        }
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
