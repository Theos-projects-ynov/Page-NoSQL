import React from 'react'
import ShortQuestion from "../components/questions/ShortQuestion";
import QuestionGeneric from "../components/questions/QuestionGeneric";

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
                title: "test",
                description: "tesst",
                required: false
            }
        ]);
        // console.log(question);
    };

    return (
        <>
            <h1>Form Creation</h1>
            <p>Form Creation</p>

            <button onClick={handleAddQuestion}>Add Question</button>

            {question.map((q, index) => (
                <QuestionGeneric
                    index={index}
                    question={question}
                    setQuestion={setQuestion}
                />
            ))}
        </>
    );
}

export default FormCreation;
