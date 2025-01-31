import React, { useEffect } from 'react';

function LongQuestion({ index, question, setQuestion }) {
    const [title, setTitle] = React.useState(question[index].title || "");

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
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', marginTop: '10px' }}>
                <p style={{ margin: 0 }}>Title :</p>
                <input
                    type="text"
                    value={title}
                    onChange={handleChangeTitle}
                    style={{ flex: 1 }} // Cela permet à l'input d'occuper l'espace disponible
                />
            </div>
            <p>Question {index + 1}</p>

            <p><textarea /> </p>
            {/*<p>{`Description: ${question.description}`}</p>*/}
            {/* Vous pouvez ajouter plus de champs pour modifier la question ici */}
            <br />
        </>
    );
}

export default LongQuestion;
