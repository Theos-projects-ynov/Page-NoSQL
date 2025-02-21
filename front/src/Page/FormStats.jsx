import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Style/page/formStats.sass";

function FormAnswers() {
    const {id} = useParams();
    const [form, setForm] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formResponse = await fetch(`http://localhost:3000/form/${id}`);
                const formData = await formResponse.json();
                setForm(formData);

                const answersResponse = await fetch(`http://localhost:3000/answer/form/${id}`);
                const answersData = await answersResponse.json();
                setAnswers(answersData);
            } catch (err) {
                console.error(err);
                setError("Erreur lors du chargement des données.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <p className="loading">Chargement...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div className="form-answers-container">
            {form && (
                <>
                    <img src={form.banner} alt="Bannière" className="banner"/>
                    <h1 className="title">{form.title}</h1>
                </>
            )}

            <h2 className="subtitle">Réponses de tous</h2>
            {answers.map((answer, index) => (
                <div key={answer._id} className="answer-container">
                    <h3 className="answer-title">Réponse {index + 1}</h3>
                    {answer.questions.map((q, idx) => (
                        <div key={idx} className="question">
                            <strong>Question {q.id} :</strong> {q.userAnswer}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default FormAnswers;
