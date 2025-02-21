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

        // Mise à jour de l'objet question avec les nouvelles options
        const updatedQuestion = { ...question, options: newCheckboxes };

        // setQuestion(prevQuestions => {
        //     const updatedQuestions = [...prevQuestions];
        //     updatedQuestions[index] = updatedQuestion; // Remplace la question modifiée
        //     return updatedQuestions;
        // });

        setInputText(''); // Réinitialise le champ de texte
    };

    // Fonction pour mettre à jour l'état d'une case à cocher spécifique
    const handleCheckboxChange = (label) => {
        const newCheckboxes = { ...checkboxes, [label]: !checkboxes[label] };
        setCheckboxes(newCheckboxes);

        // Mise à jour de l'objet question avec les nouvelles options
        const updatedQuestion = { ...question, options: newCheckboxes };

        // setQuestion(prevQuestions => {
        //     const updatedQuestions = [...prevQuestions];
        //     updatedQuestions[index] = updatedQuestion; // Remplace la question modifiée
        //     return updatedQuestions;
        // });
    };

    // Mise à jour du titre et de l'objet question
    const handleChangeTitle = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);

        const updatedQuestion = { ...question, title: newTitle };

        // setQuestion(prevQuestions => {
        //     const updatedQuestions = [...prevQuestions];
        //     updatedQuestions[index] = updatedQuestion; // Remplace la question modifiée
        //     return updatedQuestions;
        // });
    };

    return (
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px',
                marginTop: '10px'
            }}>
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
                    <label key={label} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '8px'
                    }}>
                        <input
                            type="checkbox"
                            checked={checkboxes[label]}
                            onChange={() => handleCheckboxChange(label)}
                            style={{ width: 'auto', height: 'auto' }}
                        />
                        <span>{label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

export default CheckboxQuestion;
