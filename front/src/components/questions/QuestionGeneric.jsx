import React, { useEffect, useState } from 'react';
import ShortQuestion from "./ShortQuestion";
import LongQuestion from "./LongQuestion";
import RadioQuestion from "./RadioQuestion";
import CheckboxQuestion from "./CheckboxQuestion";

function QuestionGeneric({ index, question, setQuestion }) {
    // Initialiser l'état en premier (évite les erreurs ESLint)
    const [selectedOption, setSelectedOption] = useState(question?.type || '');

    useEffect(() => {
        console.log(`⚡ Mise à jour du type de question (index ${index}):`, selectedOption);
    }, [selectedOption]);

    // Vérification que `question` est défini
    if (!question) {
        console.error(`❌ Erreur: Question à l'index ${index} est undefined`);
        return <div>Erreur: Question non trouvée</div>;
    }

    const handleChange = (e) => {
        const newType = e.target.value;
        setSelectedOption(newType);

        // Mise à jour correcte de la question
        setQuestion(prevQuestions => {
            const newQuestions = [...prevQuestions];
            newQuestions[index] = { ...newQuestions[index], type: newType };
            return newQuestions;
        });
    };

    return (
        <div className="question-container">
            <h3>Question {index + 1}</h3>

            <select
                id={`dropdown-${index}`}
                name="options"
                value={selectedOption}
                onChange={handleChange}
                className="question-type-select"
            >
                <option value="">-- Sélectionner un type --</option>
                <option value="short_question">Short Question</option>
                <option value="long_question">Long Question</option>
                <option value="radio_question">Radio Question</option>
                <option value="checkbox_question">Checkbox Question</option>
            </select>

            {/* Debug affichage */}
            <p>🛠️ Type actuel : {selectedOption}</p>

            {/* Affichage sécurisé : ne rend l'élément que si question est bien définie */}
            {selectedOption === "short_question" && question && <ShortQuestion index={index} question={question} setQuestion={setQuestion} />}
            {selectedOption === "long_question" && question && <LongQuestion index={index} question={question} setQuestion={setQuestion} />}
            {selectedOption === "radio_question" && question && <RadioQuestion index={index} question={question} setQuestion={setQuestion} />}
            {selectedOption === "checkbox_question" && question && <CheckboxQuestion index={index} question={question} setQuestion={setQuestion} />}
        </div>
    );
}

export default QuestionGeneric;
