import React, { useEffect } from 'react';

function LongQuestion({ index, question }) {
    // Initialisation du titre depuis question.title (question est un objet, pas un tableau)
    const [title, setTitle] = React.useState(question?.title || "");

    useEffect(() => {
        console.log("\n\n\nTest:");
        console.log(question); // Vérifie la structure de la question
    }, [question]);

    const handleChangeTitle = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle); // Mise à jour du titre local

        // Mise à jour du titre dans l'objet question
        if (question) {
            question.title = newTitle;
            console.log("Titre mis à jour : ", newTitle);

            // Envoie la question modifiée au parent via setQuestion
            // setQuestion(prevQuestions => {
            //     const updatedQuestions = [...prevQuestions];
            //     updatedQuestions[index] = question; // Remplace la question à l'index
            //     return updatedQuestions; // Retourne la nouvelle liste de questions
            // });
        } else {
            console.error("La question est undefined à l'index", index);
        }
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', marginTop: '10px' }}>
                <p style={{ margin: 0 }}>Title :</p>
                <input
                    type="text"
                    value={title}
                    onChange={handleChangeTitle}
                    style={{ flex: 1 }}
                />
            </div>
            <p>Question {index + 1}</p>

            <p>
                <textarea />
            </p>
            <br />
        </>
    );
}

export default LongQuestion;
