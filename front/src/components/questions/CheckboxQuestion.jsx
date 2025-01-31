import React, { useEffect, useState } from 'react';

function CheckboxQuestion({ index, question, setQuestion }) {
    const [title, setTitle] = React.useState(question[index].title || "");
    const [checkboxes, setCheckboxes] = useState({});
    const [inputText, setInputText] = useState('');

    // Fonction pour ajouter une nouvelle case à cocher
    const addCheckbox = () => {
        if (inputText.trim() === '') return; // Empêche d'ajouter une case avec un texte vide
        setCheckboxes((prevCheckboxes) => ({
            ...prevCheckboxes,
            [inputText]: false, // Valeur initiale est false (non cochée)
        }));
        setInputText(''); // Réinitialise le champ de texte
    };

    // Met à jour l'état d'une case à cocher spécifique
    const handleCheckboxChange = (label) => {
        setCheckboxes((prevCheckboxes) => ({
            ...prevCheckboxes,
            [label]: !prevCheckboxes[label], // Inverse la valeur de la case
        }));
    };

    useEffect(() => {
        console.log("\n\n\nTest:");
        console.log(question);
    }, [question]);

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
        question[index].title = e.target.value;
        console.log(title);
    }

    return (
        <>
            <p><div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', marginTop: '10px' }}>
                <p style={{ margin: 0 }}>Title :</p>
                <input
                    type="text"
                    value={title}
                    onChange={handleChangeTitle}
                    style={{ flex: 1 }} // Cela permet à l'input d'occuper l'espace disponible
                />
            </div></p>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Entrez un texte pour la case"
            />
            <button onClick={addCheckbox}>Ajouter une case à cocher</button>

            <p>Question {index + 1}</p>
            <div>
                {Object.keys(checkboxes).map((label) => (
                    <label key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <input
                            type="checkbox"
                            checked={checkboxes[label]}
                            onChange={() => handleCheckboxChange(label)}
                            style={{ width: 'auto', height: 'auto' }} // Ne pas laisser l'input checkbox occuper toute la largeur
                        />
                        <span>{label}</span>
                    </label>
                ))}
            </div>

            <br />
        </>
    );
}

export default CheckboxQuestion;
