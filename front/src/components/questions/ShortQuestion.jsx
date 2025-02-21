import React, { useEffect } from 'react';

function ShortQuestion({ index, question }) {
    const [title, setTitle] = React.useState(question?.title || '');

    useEffect(() => {
        console.log("Question dans ShortQuestion : ", question);
    }, [question]);

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);

        if (question) {
            question.title = e.target.value; // Mise à jour de la question
            console.log("Titre mis à jour : ", title);
            // setQuestion(prevQuestions => {
            //     const newQuestions = [...prevQuestions];
            //     newQuestions[index] = question; // Met à jour la question avec le nouvel 'title'
            //     return newQuestions;
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
            <input type="text" />
        </>
    );
}

export default ShortQuestion;
