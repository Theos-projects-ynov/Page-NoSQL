import React from 'react';

function ShortQuestion({ index, question, setQuestion }) {


    return (
        <>
            <h1>Short Question</h1>

            <div id="test">
                Type : <select id="dropdown" name="options">
                <option value="option1">Short Question</option>
                <option value="option2">Long Question</option>
                <option value="option3">Radio Question</option>
                <option value="option4">Checkbox Question</option>
                </select>
            </div>


            <p>Question {index + 1}</p>
            <p>{`Title: ${question.title}`}</p>
            <p>{`Description: ${question.description}`}</p>
            {/* Vous pouvez ajouter plus de champs pour modifier la question ici */}
            <label htmlFor="dropdown">Choose an option:</label>

        </>
    );
}

export default ShortQuestion;
