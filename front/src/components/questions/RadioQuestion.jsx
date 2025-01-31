import React, { useEffect, useState } from 'react';

function RadioQuestion({ index, question, setQuestion }) {
    const [title, setTitle] = useState(question[index].title || "");
    const [radioOptions, setRadioOptions] = useState(question[index].options || {});
    const [inputText, setInputText] = useState('');

    // Fonction pour ajouter une nouvelle option radio
    const addRadioOption = () => {
        if (inputText.trim() === '') return; // Empêche d'ajouter une option vide

        const newOptions = { ...radioOptions, [inputText]: false };

        // Met à jour l'array question avec l'index donné
        const updatedQuestion = [...question];
        updatedQuestion[index] = { ...updatedQuestion[index], options: newOptions };

        setQuestion(updatedQuestion);  // Mise à jour du state question
        setRadioOptions(newOptions);   // Mise à jour de l'état des options
        setInputText('');              // Réinitialise le champ de texte
    };

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
        question[index].title = e.target.value;
        console.log("titre : ", title);
    }

    // Fonction pour gérer la sélection d'une option radio
    const handleRadioChange = (label) => {
        const newOptions = { ...radioOptions };

        // Désélectionner toutes les options et sélectionner celle qui a été cliquée
        Object.keys(newOptions).forEach((key) => {
            newOptions[key] = key === label;
        });

        // Met à jour l'array question avec l'index donné
        const updatedQuestion = [...question];
        updatedQuestion[index] = { ...updatedQuestion[index], options: newOptions };

        setQuestion(updatedQuestion);  // Mise à jour du state question
        setRadioOptions(newOptions);   // Mise à jour de l'état des options
    };

    // Fonction pour réinitialiser toutes les options
    const handleClearSelection = () => {
        const newOptions = Object.keys(radioOptions).reduce((acc, label) => {
            acc[label] = false; // Tous les boutons sont désélectionnés
            return acc;
        }, {});

        // Met à jour l'array question avec les options réinitialisées
        const updatedQuestion = [...question];
        updatedQuestion[index] = { ...updatedQuestion[index], options: newOptions };

        setQuestion(updatedQuestion);  // Mise à jour du state question
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
                    style={{ flex: 1 }} // Cela permet à l'input d'occuper l'espace disponible
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
                            style={{ width: 'auto', height: 'auto' }} // Ne pas laisser l'input radio occuper toute la largeur
                        />
                        <span>{label}</span>
                    </label>
                ))}
            </div>

            {/* Bouton pour réinitialiser la sélection */}
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
