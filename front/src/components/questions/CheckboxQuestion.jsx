import React, { useEffect, useState } from 'react';

function ShortQuestion({ index, question, setQuestion }) {
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
            <h1>Short Question</h1>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Entrez un texte pour la case"
            />
            <button onClick={addCheckbox}>Ajouter une case à cocher</button>

            <p>Question {index + 1}</p>
            <p>{`Title : ${question[index].title}`}
                {Object.keys(checkboxes).map((label) => (
                    <label key={label}>
                        <input
                            type="checkbox"
                            checked={checkboxes[label]}
                            onChange={() => handleCheckboxChange(label)}
                        />
                        {label}
                    </label>
                ))}

            </p>
            {/*<p>{`Description: ${question.description}`}</p>*/}
            {/* Vous pouvez ajouter plus de champs pour modifier la question ici */}
            <br/>
        </>
    );
}

export default ShortQuestion;
