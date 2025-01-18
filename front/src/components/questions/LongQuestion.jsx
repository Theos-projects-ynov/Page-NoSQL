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
            <h1>Short Question</h1>

            <p>Question {index + 1}</p>
            <p>{`Title : ${question[index].title}`}<textarea value={title} onChange={handleChangeTitle} /> </p>
            {/*<p>{`Description: ${question.description}`}</p>*/}
            {/* Vous pouvez ajouter plus de champs pour modifier la question ici */}
            <br/>
        </>
    );
}

export default LongQuestion;
