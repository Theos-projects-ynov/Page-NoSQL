import React from 'react'
import ShortQuestion from "../components/questions/ShortQuestion";

function FormCreation() {
    const [question, setQuestion] = React.useState([]);
    const [form, setForm] = React.useState({
        title: "",
        description: "",
        questions: question
    });

    const handleAddQuestion = (e) => {
        e.preventDefault();
        setQuestion([
            ...question,
            {
                type: "short",
                title: "",
                description: "",
                required: false
            }
        ]);
    };

    return (
        <>
            <h1>Form Creation</h1>
            <p>Form Creation</p>

            <button onClick={handleAddQuestion}>Add Question</button>

            {question.map((q, index) => (
                <ShortQuestion
                    key={index}
                    index={index}
                    question={q}
                    setQuestion={setQuestion}
                />
            ))}
        </>
    );
}

export default FormCreation;
