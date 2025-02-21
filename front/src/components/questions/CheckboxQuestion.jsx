import React, { useState } from 'react';

function CheckboxQuestion({ index, question }) {
    const [title, setTitle] = useState(question?.title || "");
    const [checkboxes, setCheckboxes] = useState(question?.options || {});
    const [inputText, setInputText] = useState('');

    // Fonction pour ajouter une nouvelle case à cocher
    const addCheckbox = () => {
        if (inputText.trim() === '') return; // Empêche d'ajouter une case avec un texte vide
        const newCheckboxes = { ...checkboxes, [inputText]: false };
        setCheckboxes(newCheckboxes);
        setInputText(''); // Réinitialise le champ de texte
    };

    // Fonction pour supprimer une case à cocher
    const removeCheckbox = (label) => {
        const newCheckboxes = { ...checkboxes };
        delete newCheckboxes[label]; // Supprime l'option par son label
        setCheckboxes(newCheckboxes);
    };

    // Fonction pour mettre à jour l'état d'une case à cocher spécifique
    const handleCheckboxChange = (label) => {
        const newCheckboxes = { ...checkboxes, [label]: !checkboxes[label] };
        setCheckboxes(newCheckboxes);
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
                placeholder="Entrez un texte pour la case"
            />
            <button onClick={addCheckbox}>Ajouter une case à cocher</button>

            <div>
                {Object.keys(checkboxes).map((label) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <input
                            type="checkbox"
                            checked={checkboxes[label]}
                            onChange={() => handleCheckboxChange(label)}
                            style={{ width: 'auto', height: 'auto' }}
                        />
                        <span>{label}</span>
                        <button onClick={() => removeCheckbox(label)} style={{ marginLeft: '10px' , background: 'red'}}>Supprimer l'option</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CheckboxQuestion;
