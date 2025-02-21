import React, { useState } from 'react';

function RadioQuestion({ index, question }) {
    const [title, setTitle] = useState(question?.title || "");
    const [radioOptions, setRadioOptions] = useState(question?.options || {});
    const [inputText, setInputText] = useState('');

    // Fonction pour ajouter une nouvelle option radio
    const addRadioOption = () => {
        if (inputText.trim() === '') return; // Empêche d'ajouter une option vide
        const newOptions = { ...radioOptions, [inputText]: false };
        setRadioOptions(newOptions);
        setInputText(''); // Réinitialise le champ de texte
    };

    // Fonction pour supprimer une option radio
    const removeRadioOption = (label) => {
        const newOptions = { ...radioOptions };
        delete newOptions[label]; // Supprime l'option par son label
        setRadioOptions(newOptions);
    };

    // Fonction pour gérer la sélection d'une option radio
    const handleRadioChange = (label) => {
        const newOptions = { ...radioOptions };
        Object.keys(newOptions).forEach((key) => {
            newOptions[key] = key === label;
        });
        setRadioOptions(newOptions);
    };

    // Mise à jour du titre
    const handleChangeTitle = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
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
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <input
                            type="radio"
                            name={`radio-group-${index}`} // Assurez-vous que tous les radios du même groupe ont le même nom
                            checked={radioOptions[label]}
                            onChange={() => handleRadioChange(label)}
                            style={{ width: 'auto', height: 'auto' }}
                        />
                        <span>{label}</span>
                        <button onClick={() => removeRadioOption(label)} style={{ marginLeft: '10px' , background: 'red'}}>Supprimer l'option</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RadioQuestion;
