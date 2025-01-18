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

    return (
        <div>
            <h3>{title}</h3>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Entrez un texte pour l'option"
            />
            <button onClick={addRadioOption}>Ajouter une option</button>

            <div>
                {Object.keys(radioOptions).map((label) => (
                    <label key={label}>
                        <input
                            type="radio"
                            name={`radio-group-${index}`}  // Assurez-vous que tous les radios du même groupe ont le même nom
                            checked={radioOptions[label]}
                            onChange={() => handleRadioChange(label)}
                        />
                        {label}
                    </label>
                ))}
            </div>

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
