import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function FormResponse() {
    const { id } = useParams();
    const [form, setForm] = useState(null);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3000/form/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setForm(data);
                const initialAnswers = {};
                data.questions.forEach((question, index) => {
                    initialAnswers[index] = "";
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/submit-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    formId: id,
                    responses: answers,
                }),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            console.log("Réponses soumises avec succès !");
        } catch (error) {
            console.error("Erreur lors de la soumission :", error);
        }
    };

    if (!form) {
        return <p>Chargement...</p>;
    }

    return (
        <div className="form-container">
            <img src={form.banner} alt="Bannière" className="form-banner" />
            <h1>{form.title}</h1>
            <p>{form.description}</p>

            <form onSubmit={handleSubmit}>
                {form.questions.map((question, index) => {
                    if (!question.type) {
                        return <p key={index} style={{ color: "red" }}>⚠ Question sans type ignorée</p>;
                    }

                    return (
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
                            ) : question.type === "radio_question" && question.options ? (
                                <div>
                                    {Object.entries(question.options).map(([key, value]) => (
                                        <label key={key}>
                                            <input
                                                type="radio"
                                                name={`question-${index}`}
                                                value={value}
                                                checked={answers[index] === value}
                                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                                            />
                                            {value}
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ color: "red" }}>⚠ Type de question non pris en charge : {question.type}</p>
                            )}
                        </div>
                    );
                })}

                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
}


export default FormResponse;
