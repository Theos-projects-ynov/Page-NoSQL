import React, { useEffect, useState } from 'react';

function RadioQuestion({ index, question, setQuestion }) {
    // Initialisation du titre et des options directement à partir de l'objet question
    const [title, setTitle] = useState(question?.title || "");
    const [radioOptions, setRadioOptions] = useState(question?.options || {});
    const [inputText, setInputText] = useState('');

    // Fonction pour ajouter une nouvelle option radio
    const addRadioOption = () => {
        if (inputText.trim() === '') return; // Empêche d'ajouter une option vide

        const newOptions = { ...radioOptions, [inputText]: false };

        // Met à jour l'objet question avec les nouvelles options
        const updatedQuestion = { ...question, options: newOptions };

        setQuestion(prevQuestions => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[index] = updatedQuestion; // Remplace la question modifiée
            return updatedQuestions; // Retourne la nouvelle liste des questions
        });

        setRadioOptions(newOptions);   // Mise à jour de l'état des options
        setInputText('');              // Réinitialise le champ de texte
    };

    const handleChangeTitle = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);

        // Mise à jour du titre dans l'objet question
        const updatedQuestion = { ...question, title: newTitle };

        setQuestion(prevQuestions => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[index] = updatedQuestion; // Remplace la question modifiée
            return updatedQuestions;
        });
    };

    // Fonction pour gérer la sélection d'une option radio
    const handleRadioChange = (label) => {
        const newOptions = { ...radioOptions };

        // Désélectionner toutes les options et sélectionner celle qui a été cliquée
        Object.keys(newOptions).forEach((key) => {
            newOptions[key] = key === label;
        });

        // Met à jour l'objet question avec les nouvelles options
        const updatedQuestion = { ...question, options: newOptions };

        setQuestion(prevQuestions => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[index] = updatedQuestion; // Remplace la question modifiée
            return updatedQuestions;
        });

        setRadioOptions(newOptions);   // Mise à jour de l'état des options
    };

    // Fonction pour réinitialiser toutes les options
    const handleClearSelection = () => {
        const newOptions = Object.keys(radioOptions).reduce((acc, label) => {
            acc[label] = false; // Tous les boutons sont désélectionnés
            return acc;
        }, {});

        // Met à jour l'objet question avec les options réinitialisées
        const updatedQuestion = { ...question, options: newOptions };

        setQuestion(prevQuestions => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[index] = updatedQuestion; // Remplace la question modifiée
            return updatedQuestions;
        });

        setRadioOptions(newOptions);   // Mise à jour de l'état des options
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', marginTop: '10px' }}>
                <p style={{ margin: 0 }}>Title :</p>
                <input
                    type="text"
                    value={title}
                    onChange={handleChangeTitle}
                    style={{ flex: 1 }}
                />
            </div>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Entrez un texte pour l'option"
            />
            <button onClick={addRadioOption}>Ajouter une option</button>

            <div>
                {Object.keys(radioOptions).map((label) => (
                    <label key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <input
                            type="radio"
                            name={`radio-group-${index}`}  // Assurez-vous que tous les radios du même groupe ont le même nom
                            checked={radioOptions[label]}
                            onChange={() => handleRadioChange(label)}
                            style={{ width: 'auto', height: 'auto' }}
                        />
                        <span>{label}</span>
                    </label>
                ))}
            </div>

            <button onClick={handleClearSelection} style={{ marginTop: '10px' }}>
                Clear Selection
            </button>

            <div>
                <h4>Option sélectionnée :</h4>
                <p>
                    {Object.entries(radioOptions).find(([label, checked]) => checked)?.[0] ||
                        'Aucune option sélectionnée'}
                </p>
            </div>
        </div>
    );
}

export default RadioQuestion;
