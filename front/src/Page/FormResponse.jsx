import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Style/formResponse.css";
import { jwtDecode } from "jwt-decode";

function FormResponse() {
    const {id} = useParams();
    const navigate = useNavigate(); // Hook pour la redirection
    const [form, setForm] = useState(null);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3000/form/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setForm(data);

                const initialAnswers = {};
                data.questions.forEach((question, index) => {
                    if (question.type === "checkbox_question") {
                        initialAnswers[index] = [];
                    } else {
                        initialAnswers[index] = "";
                    }
                });
                setAnswers(initialAnswers);
            })
            .catch((error) => console.error("Erreur de chargement :", error));
    }, [id]);

    const handleAnswerChange = (index, value) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [index]: value,
        }));
    };

    const handleCheckboxChange = (index, option) => {
        setAnswers((prevAnswers) => {
            const currentAnswers = prevAnswers[index] || [];
            if (currentAnswers.includes(option)) {
                return {
                    ...prevAnswers,
                    [index]: currentAnswers.filter((item) => item !== option),
                };
            } else {
                return {
                    ...prevAnswers,
                    [index]: [...currentAnswers, option],
                };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("form : ", form);

        const token = localStorage.getItem('token');
        if (!token) return;

        const responderId = jwtDecode(token).id;
        const auhtorFormId = form.authorId;

        const formattedAnswers = Object.entries(answers).map(([index, userAnswer]) => ({
            id: Number(index),
            userAnswer,
            answer: userAnswer,
        }));

        const payload = {
            responderId,
            formId: id,
            auhtorFormId,
            questions: formattedAnswers,
        };

        try {
            const response = await fetch("http://localhost:3000/answer/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            console.log("Réponses envoyées avec succès !");

            navigate("/");

        } catch (error) {
            console.error("Erreur lors de la soumission :", error);
            console.log("Données envoyées : ", {
                responderId,
                formId: id,
                auhtorFormId,
                questions: formattedAnswers
            });
        }
    };


    if (!form) {
        return <p>Chargement...</p>;
    }

    return (
        <div className="form-response-container">
            <img src={form.banner} alt="Bannière"
                 className="form-response-banner"/>
            <h1>{form.title}</h1>
            <p>{form.description}</p>

            <form onSubmit={handleSubmit}>
                {form.questions.map((question, index) => (
                    <div key={index} className="question-block">
                        <label>{question.title}</label>

                        {question.type === "short_question" ? (
                            <input
                                type="text"
                                value={answers[index] || ""}
                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                                placeholder="Votre réponse..."
                            />
                        ) : question.type === "long_question" ? (
                            <textarea
                                value={answers[index] || ""}
                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                                placeholder="Votre réponse..."
                            />
                        ) : question.type === "radio_question" ? (
                            <div className="question-options">
                                {Object.keys(question.options).map((option) => (
                                    <label key={option}>
                                        <input
                                            type="radio"
                                            name={`radio-${index}`}
                                            value={option}
                                            checked={answers[index] === option}
                                            onChange={() => handleAnswerChange(index, option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        ) : question.type === "checkbox_question" ? (
                            <div className="question-options">
                                {Object.keys(question.options).map((option) => (
                                    <label key={option}>
                                        <input
                                            type="checkbox"
                                            value={option}
                                            checked={answers[index]?.includes(option)}
                                            onChange={() => handleCheckboxChange(index, option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <p>Type de question non pris en charge</p>
                        )}
                    </div>
                ))}

                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
}

export default FormResponse;
